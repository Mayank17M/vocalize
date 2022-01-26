from ISStreamer.Streamer import Streamer

ACCESS_KEY = "ist_Dhztjg5pZmQeJuFgID3dinHYM7PqX2v7"
BUCKET_KEY = "RVCXRFDKET8E"
BUCKET_NAME = "Emotion recognition"

# create a Streamer instance
streamer = Streamer(bucket_name=BUCKET_NAME, bucket_key=BUCKET_KEY, access_key=ACCESS_KEY)

# send some data
streamer.log("myNumber", 7)

# flush and close the stream
streamer.flush()