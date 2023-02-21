import face_recognition
import numpy as np
import pickle
img1 = face_recognition.load_image_file("./images/img2.jpg")
print(type(img1), img1.shape)
img1_encodings = np.array(face_recognition.face_encodings(img1))
print(type(img1_encodings))
print(type(pickle.dumps(img1_encodings)))

# img2 = face_recognition.load_image_file("./images/img4.jpg")
# print(type(img2),img2.shape)
# img2_encodings = np.array(face_recognition.face_encodings(img2))
# print(type(img2_encodings))
# print(img2_encodings.shape)


# print(face_recognition.compare_faces(img1_encodings,img2_encodings))