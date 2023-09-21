import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";

const Pokedex = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const pokemonList = response.data.results;
        const pokemonDetails = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const detailsResponse = await axios.get(pokemon.url);
            return detailsResponse.data;
          })
        );
        setPokemonData(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Pokedex</Typography>
          <Button color="inherit">Search</Button>
        </Toolbar>
      </AppBar>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {pokemonData.map((pokemon) => (
          <Card key={pokemon.id} style={{ margin: "16px", width: "200px" }}>
            <CardMedia
              component="img"
              alt={pokemon.name}
              height="140"
              image={pokemon.sprites.front_default}
            />
            <CardContent>
              <Typography variant="h6">{pokemon.name}</Typography>
              <List>
                {pokemon.moves.slice(0, 5).map((move, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={move.move.name} />
                  </ListItem>
                ))}
              </List>
              {pokemon.evolution_chain && (
                <Typography variant="body2">
                  Evolves at level {pokemon.evolution_chain.min_level}
                </Typography>
              )}
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
