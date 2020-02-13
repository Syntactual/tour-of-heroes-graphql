import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};



export type Hero = {
   __typename?: 'Hero',
  id?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
};

export type HeroInput = {
  id?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  saveHero?: Maybe<Hero>,
  addHero?: Maybe<Hero>,
  deleteHero?: Maybe<Hero>,
};


export type MutationSaveHeroArgs = {
  hero: HeroInput
};


export type MutationAddHeroArgs = {
  name: Scalars['String']
};


export type MutationDeleteHeroArgs = {
  hero: HeroInput
};

export type Query = {
   __typename?: 'Query',
  heroes?: Maybe<Array<Maybe<Hero>>>,
  hero?: Maybe<Hero>,
  searchHeroes?: Maybe<Array<Maybe<Hero>>>,
};


export type QueryHeroArgs = {
  id: Scalars['Int']
};


export type QuerySearchHeroesArgs = {
  searchTerm?: Maybe<Scalars['String']>
};

export type GetHeroesQueryVariables = {};


export type GetHeroesQuery = (
  { __typename?: 'Query' }
  & { heroes: Maybe<Array<Maybe<(
    { __typename?: 'Hero' }
    & Pick<Hero, 'id' | 'name'>
  )>>> }
);

export type GetHeroQueryVariables = {
  id: Scalars['Int']
};


export type GetHeroQuery = (
  { __typename?: 'Query' }
  & { hero: Maybe<(
    { __typename?: 'Hero' }
    & Pick<Hero, 'id' | 'name'>
  )> }
);

export type SaveHeroMutationVariables = {
  hero: HeroInput
};


export type SaveHeroMutation = (
  { __typename?: 'Mutation' }
  & { saveHero: Maybe<(
    { __typename?: 'Hero' }
    & Pick<Hero, 'id' | 'name'>
  )> }
);

export type SearchHeroesQueryVariables = {
  searchTerm?: Maybe<Scalars['String']>
};


export type SearchHeroesQuery = (
  { __typename?: 'Query' }
  & { searchHeroes: Maybe<Array<Maybe<(
    { __typename?: 'Hero' }
    & Pick<Hero, 'id' | 'name'>
  )>>> }
);

export type AddHeroMutationVariables = {
  name: Scalars['String']
};


export type AddHeroMutation = (
  { __typename?: 'Mutation' }
  & { addHero: Maybe<(
    { __typename?: 'Hero' }
    & Pick<Hero, 'id' | 'name'>
  )> }
);

export type DeleteHeroMutationVariables = {
  hero: HeroInput
};


export type DeleteHeroMutation = (
  { __typename?: 'Mutation' }
  & { deleteHero: Maybe<(
    { __typename?: 'Hero' }
    & Pick<Hero, 'id' | 'name'>
  )> }
);

export const GetHeroesDocument = gql`
    query getHeroes {
  heroes {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetHeroesGQL extends Apollo.Query<GetHeroesQuery, GetHeroesQueryVariables> {
    document = GetHeroesDocument;
    
  }
export const GetHeroDocument = gql`
    query getHero($id: Int!) {
  hero(id: $id) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetHeroGQL extends Apollo.Query<GetHeroQuery, GetHeroQueryVariables> {
    document = GetHeroDocument;
    
  }
export const SaveHeroDocument = gql`
    mutation saveHero($hero: HeroInput!) {
  saveHero(hero: $hero) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveHeroGQL extends Apollo.Mutation<SaveHeroMutation, SaveHeroMutationVariables> {
    document = SaveHeroDocument;
    
  }
export const SearchHeroesDocument = gql`
    query searchHeroes($searchTerm: String) {
  searchHeroes(searchTerm: $searchTerm) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SearchHeroesGQL extends Apollo.Query<SearchHeroesQuery, SearchHeroesQueryVariables> {
    document = SearchHeroesDocument;
    
  }
export const AddHeroDocument = gql`
    mutation addHero($name: String!) {
  addHero(name: $name) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddHeroGQL extends Apollo.Mutation<AddHeroMutation, AddHeroMutationVariables> {
    document = AddHeroDocument;
    
  }
export const DeleteHeroDocument = gql`
    mutation deleteHero($hero: HeroInput!) {
  deleteHero(hero: $hero) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteHeroGQL extends Apollo.Mutation<DeleteHeroMutation, DeleteHeroMutationVariables> {
    document = DeleteHeroDocument;
    
  }