/*import { Injectable } from '@nestjs/common';
import axios , { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';

@Injectable()
export class SeedService {
  
  private readonly axios : AxiosInstance = axios ;

  //opción no usar axios adaptador

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){}

  async executeSeed(){

    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')


    //antes borrar repetidos
    //const {data}=await this.pokemonModel.deleteMany({}); // equivale a delete *
    //inserta varios 
    //const insertPromisesArray=[];
    //----------------

    const pokemonToInsert : {name:string,no:number, num:number}[]=[];

    data.results.forEach( async ({name , url}) => {

      const segments = url.split('/');
      const no:number = +segments[segments.length-2]
      const num:number = +segments[segments.length-2]

      //varios no tan optimo
      //insertPromisesArray.push(this.pokemonModel.create ( {name , no, num }))

      pokemonToInsert.push(
        {name , no, num:1}
      ); //arreglo con los valores

      // de a uno ok
      //const pokemon = await this.pokemonModel.create ( {name , no, num });
      await this.pokemonModel.insertMany(pokemonToInsert);

      //console.log ({name , no});

    })
    //console.log(fetch);
    //return data.results;
    //await Promise.all(insertPromisesArray);
    return 'grabó';


    //forma optima es otra


  }
}*/

// aca sin axios
import { Injectable } from '@nestjs/common';
//import axios , { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  
  //private readonly axios : AxiosInstance = axios ;

  //opción no usar axios adaptador

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon> ,
    private readonly http: AxiosAdapter,
  ){}

  async executeSeed(){

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100')


    //antes borrar repetidos
    //const {data}=await this.pokemonModel.deleteMany({}); // equivale a delete *
    //inserta varios 
    //const insertPromisesArray=[];
    //----------------

    const pokemonToInsert : {name:string,no:number, num:number}[]=[];

    data.results.forEach( async ({name , url}) => {

      const segments = url.split('/');
      const no:number = +segments[segments.length-2]
      const num:number = +segments[segments.length-2]

      //varios no tan optimo
      //insertPromisesArray.push(this.pokemonModel.create ( {name , no, num }))

      pokemonToInsert.push(
        {name , no, num:1}
      ); //arreglo con los valores

      // de a uno ok
      //const pokemon = await this.pokemonModel.create ( {name , no, num });
      await this.pokemonModel.insertMany(pokemonToInsert);

      //console.log ({name , no});

    })
    //console.log(fetch);
    //return data.results;
    //await Promise.all(insertPromisesArray);
    return 'grabó';


    //forma optima es otra


  }
}