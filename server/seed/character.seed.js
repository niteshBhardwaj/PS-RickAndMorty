import node from 'node-fetch'
import CharacterModel from '../models/CharacterModel'

const MAX_COUNT = 30;

export default async function seedCharacters() {
    let count = await CharacterModel.estimatedDocumentCount();
    if(count === 0) {
        saveAllCharacter(1, function(err) {
            if(err) return console.log(err);
            console.log('all character saved in db!');
        })
    }
}

function saveAllCharacter(page=1, callback) {
        node(`https://rickandmortyapi.com/api/character?page=${page}`)
        .then(res => res.json())
        .then(async ({results}) => {
            try {
                await CharacterModel.insertMany(results);
                if(page === MAX_COUNT) return callback();
                console.log('saving character..', page);
                return saveAllCharacter(page + 1, callback);
            } catch(e) {
                callback(e);
            }   
        })
}