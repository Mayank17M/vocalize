from ISStreamer.Streamer import Streamer
from flask import Flask
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast

app=Flask(__name__)
api = Api(app)

#/users
users_path= '''wherever user data is stored'''
#/audio

class Users(Resource):
    def get(self):
        data = pd.read_csv(users_path) #replace csv with whatever end path is used according to users_path
        data = data.to_dict()
        return {'data':data}, 200 

    def post(self):
        parser=reqparse.RequestParser()
        parser.add_argument('audioId',required=True, type=int)
        ##parser.add_argument('name',required=True, type=str)
        args = parser.parse_args()
        #audio,
        data = pd.read_csv(users_path)

        if args['audioId'] in data['audioId']:
            return {
            'message': f"{args['audioId']} already exists"
            },409 #might use a different number
        else:
            data = data.append({
                'audioId':str(args['audioId']) ,
                #'name':args['name']
            }, ignore_index = True)
            return {'data':data.to_dict()},200

    def delete(self):
        parser=reqparse.RequestParser()
        parser.add_argument('audioId',required=True, type=int)
        ##parser.add_argument('name',required=True, type=str)
        args = parser.parse_args()

        if args['audioId'] in data['audioId']:
            data= data[data['audioId']!=args['audioId']]
            data.to_csv(users_path, index=False)
            return {'data':data.to_dict()},200 
        else:
            return {'message':f"{args['audioId']} does not exist!"
            },404 


class Audio(Resource):
    pass

api.add_resource(Users,'/users') # Adds a resource to the api
api.add_resource(Audio,'/audio')

if __name__ == "__main__":
    app.run(debug=True)

ACCESS_KEY = "ist_JJvvBP8oyjgwCWQzMzQUpSEkUzL_YdBj"
BUCKET_KEY = "MBUPRFEQNGPS"
BUCKET_NAME = "vocalize"

# create a Streamer instance
streamer = Streamer(bucket_name=BUCKET_NAME, bucket_key=BUCKET_KEY, access_key=ACCESS_KEY)

streamer.log("myNumber", 25)

# flush and close the stream
streamer.flush()