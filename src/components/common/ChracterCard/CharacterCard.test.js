import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import CharacterCard from "./CharacterCard";

const mockItem = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth (C-137)"},
  location: { name: "Earth (Replacement Dimension)"},
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  created: "2017-11-04T18:48:46.250Z",
};

it("renders character card", () => {
   
   render(<CharacterCard item={mockItem} />)

   expect(screen.getByText("Rick Sanchez")).toHaveTextContent("Rick Sanchez")
   expect(screen.getByText("Alive")).toHaveTextContent("Alive")
   expect(screen.getByText("Human")).toHaveTextContent("Human")
   expect(screen.getByText("Earth (C-137)")).toHaveTextContent("Earth (C-137)")
});
