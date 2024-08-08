import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

    constructor(
      @InjectModel(Pokemon.name)
      private readonly pokemonModel: Model<Pokemon>,
    ){}

//---------------------------------------------------
  async create(createPokemonDto: CreatePokemonDto) {
   // return this.pokemonService.create(createPokemonDto);
   createPokemonDto.name=createPokemonDto.name.toLocaleLowerCase();

   try{
   const pokemon = await this.pokemonModel.create(createPokemonDto);
   return pokemon;
   }catch(error){
     if (error.code === 11000){
      throw new BadRequestException(`Ya existe en BD ${JSON.stringify(error.keyValue)}`);
     }
     console.log(error);
     throw new InternalServerErrorException(`No se pudo crear, vea log`);
   }

    //return 'This o adds a new pokemon';
  }
//---------------------------------------------------------------
  findAll() {
    return `This action returns all pokemon`;
  }
//---------------------------------------------------------------
  async findOne(term: string) {

      let pokemon: Pokemon;
      if (! isNaN(+term) ){
         pokemon = await this.pokemonModel.findOne({ no: term});
        console.log ('entro1');
      }
      
      if(!pokemon && isValidObjectId(term)){
        pokemon = await this.pokemonModel.findOne({ term});
      }
      if (! pokemon){
       pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim()});
      }
      //MongoID
      //Name

      if (!pokemon)
        throw new NotFoundException (`Pokemon con id "${term}" no existe`);
      return pokemon;
   // return `This action returns a #${term} pokemon`;
  }
//---------------------------------------------------------------
  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne( term );
    console.log ('entro2');
    if ( updatePokemonDto.name )
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    
   // const actuaPoke = await pokemon.updateOne( updatePokemonDto , { new: true});
   // return actuaPoke;
   try{
    await pokemon.updateOne( updatePokemonDto);
    return {...pokemon.toJSON(), ...updatePokemonDto};
   }catch(error){
    this.handleExceptions(error);
  }
    //return `This action updates a #${term} pokemon`;
  }
//---------------------------------------------------------------
  async remove(id: string) {
    //const pokemon = await this.findOne( id );
    //console.log ('entro3');
   // await pokemon.deleteOne();
    console.log ('entro delete antes');
   //const resultado = await this.pokemonModel.findByIdAndDelete( id );
   //const resultado = await this.pokemonModel.deleteOne({_id: id})
   const {deletedCount} = await this.pokemonModel.deleteOne({_id: id})
   if (deletedCount  === 0){
    throw new BadRequestException(`No se encontró para eliminar "${id} `);
   }
    console.log ('entro delete despues');
    return;
   //return resultado;

      //  return { id } ;
    //return `This action removes a #${id} pokemon`;
  }

//---------------------------------------------------------------
private handleExceptions (error:any)
{
  if (error.code === 11000){
    throw new BadRequestException(`Ya existe en BD ${JSON.stringify(error.keyValue)}`);
   }
   console.log(error);
   throw new InternalServerErrorException(`No se pudo actualizar, vea log`);

}
 


}
