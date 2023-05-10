import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from fastapi import FastAPI, File, UploadFile
import shutil

app = FastAPI()


@app.post("/recommendations/")
async def post_recommendations(required_user, recommendations_number, csv_file: UploadFile = File(...)):

    recommendations_number = int(recommendations_number)

    with open('data/data.csv', "wb") as buffer:
        shutil.copyfileobj(csv_file.file, buffer)

    data = pd.read_csv('data/data.csv').astype({'id': str})

    cosine_sim = cosine_similarity(data.set_index('id'))

    user_index = data.index[data['id'] == required_user][0]

    similar = list(enumerate(cosine_sim[user_index]))

    sorted_similar = sorted(similar, key=lambda x: x[1], reverse=True)

    if recommendations_number+1 > len(sorted_similar)-1 or recommendations_number <= 0:
        recommendations_number = data.shape[0]

    recommendations = [data.iloc[entity[0]]['id'] for entity in sorted_similar[1:recommendations_number+1]]

    return {"recommendations": recommendations}


# print(get_recommendations(1010))
