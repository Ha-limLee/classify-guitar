# use tensorflow-cpu instead of tensorflow
# since tensorflow lib is much bigger than tensorflow-cpu
# see: https://stackoverflow.com/questions/61062303/deploy-python-app-to-heroku-slug-size-too-large
# import tensorflow-cpu


'''
todo:
classify electric guitar images in /uploads and

'''
import sys
import requests
from functools import reduce

PORT = sys.argv[1]
URL = "http://localhost:" + PORT
if __name__ == '__main__':
    print('hello')
    
