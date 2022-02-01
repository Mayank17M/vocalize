import soundfile
import os, glob, pickle
import numpy as np
import librosa
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score
from pydub import AudioSegment
from pydub.utils import make_chunks

DIRECTORY = 'D:/GitHub/vocalize'
AUDIO_FILEPATH ='D:/study/ravdess/Actor_*/*.wav'

#Emotions from the RAVDESS dataset
emotions={
  '01':'neutral',
  '02':'calm',
  '03':'happy',
  '04':'sad',
  '05':'angry',
  '06':'fearful',
  '07':'disgust',
  '08':'surprised'
}

#Emotions to observe
default_observed_emotions = ['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgust', 'surprised']

class EmotionClassifier:
    def __init__(self, 
                observed_emotions=None, 
                alpha=0.09, 
                batch_size=32, 
                epsilon=1e-08, 
                hidden_layer_sizes=[200 for i in range(5)], 
                learning_rate='adaptive', 
                learning_rate_init=0.0001, 
                max_iter=5000):
        self.observed_emotions = default_observed_emotions
        if observed_emotions:
            self.observed_emotions = observed_emotions
        self.alpha = alpha
        self.batch_size = batch_size
        self.epsilon = epsilon
        self.hidden_layer_sizes = hidden_layer_sizes
        self.learning_rate = learning_rate
        self.learning_rate_init = learning_rate_init
        self.max_iter = max_iter

        self.model = MLPClassifier(alpha = self.alpha,
                                   batch_size = self.batch_size,
                                   epsilon = self.epsilon,
                                   hidden_layer_sizes = self.hidden_layer_sizes,
                                   learning_rate = self.learning_rate,
                                   learning_rate_init = self.learning_rate_init,
                                   max_iter = self.max_iter)
        
        self.x_test = []
        self.y_test = []
        self.x_train = []
        self.y_train = []

    #Extract features (mfcc, chroma, mel) from a sound file
    def extract_feature(self, file_name, mfcc, chroma, mel):
        with soundfile.SoundFile(file_name) as sound_file:
            X = sound_file.read(dtype="float32")
            sample_rate=sound_file.samplerate
            if chroma:
                stft=np.abs(librosa.stft(X))
            result=np.array([])
            if mfcc:
                mfccs=np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=40).T, axis=0)
                result=np.hstack((result, mfccs))
            if chroma:
                chroma=np.mean(librosa.feature.chroma_stft(S=stft, sr=sample_rate).T,axis=0)
                result=np.hstack((result, chroma))
            if mel:
                mel=np.mean(librosa.feature.melspectrogram(X, sr=sample_rate).T,axis=0)
                result=np.hstack((result, mel))
            return result

    #Load the data from the audio files and extract their features
    def load_data(self, test_size):
        features_list, emotions_list = [], []
        for file in glob.glob(AUDIO_FILEPATH):
            file_name = os.path.basename(file)
            emotion = emotions[file_name.split('-')[2]]
            if emotion in self.observed_emotions:
                feature = self.extract_feature(file, mfcc=True, chroma=True, mel=True)
                features_list.append(feature)
                emotions_list.append(emotion)
        return train_test_split(np.array(features_list), np.asarray(emotions_list), test_size=test_size, random_state=9)

    #Train the model
    def train(self, test_size):
        if not self.x_train:
            self.x_train, self.x_test, self.y_train, self.y_test = self.load_data(test_size=0.25)
        self.model.fit(self.x_train, self.y_train)

    def test_for_accuracy(self):
        if not self.x_train:
            self.x_train, self.x_test, self.y_train, self.y_test = self.load_data(test_size=0.25)

        #Test on training data
        y_pred = self.model.predict(self.x_train)
        accuracy = accuracy_score(y_true = self.y_train, y_pred=y_pred)
        print("Accuracy on training data: {:.2f}%".format(accuracy*100))

        #Test on test data
        y_pred = self.model.predict(self.x_test)
        accuracy = accuracy_score(y_true = self.y_test, y_pred=y_pred)
        print("Accuracy on test data: {:.2f}%".format(accuracy*100))

    def splice_audio(self, file_name):
        myaudio = AudioSegment.from_file(file_name, "wav")
        chunk_length_ms = 1000 # pydub calculates in millisec
        return make_chunks(myaudio, chunk_length_ms) #Make chunks of one sec
