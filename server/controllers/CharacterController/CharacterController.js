import CharacterModel from "../../models/CharacterModel/CharacterModel";
import {getItem, setItem} from '../../MemoryStorage'

class CharacterController {

    static async characterList(_, args, context) {
        let {limit = 10, query, gender, origin, species, sort=-1} = args;
        let match = {}
        if(query) {
            match.name = {$regex:new RegExp(`${query}`, "i")}
        }
        if(gender) {
            match.gender = {$in: gender}
        }
        if(origin) {
            match['origin.name'] = {$in: origin}
        }
        if(species) {
            match.species = {$in: species}
        }
        let list = await CharacterModel
            .aggregate()
            .match(match)
            .limit(limit)
            .sort({id: sort})

        return list;
    }

    static async filterOptions(_, args, context) {
        let list = getItem('filterList');
        if(!!list) return list;
        list = await CharacterModel
            .aggregate()
            .group({
                _id: null,
                species: { $addToSet: "$species" },
                origin: {$addToSet: "$origin.name"},
                gender: {$addToSet: "$gender"}
            })
            // save filter list to memory
            setItem('filterList', list[0]);
            return list[0];
    }
}


export default CharacterController;