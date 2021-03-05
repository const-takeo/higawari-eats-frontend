/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MenuParts
// ====================================================

export interface MenuParts_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface MenuParts_options {
  __typename: "DishOptions";
  name: string;
  extra: number | null;
  choices: MenuParts_options_choices[] | null;
}

export interface MenuParts {
  __typename: "DishEntity";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: MenuParts_options[] | null;
}
