import { useEffect, useState } from "react";
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
      <AppBar position="static" style={{backgroundColor: "#ffcb05"}}>
        <Toolbar style={{
            display: "flex",
            justifyContent: "space-between", 
            alignItems: "center",
            color: "#3c5aa6" 
          }}>
          <Typography variant="h6">Pokedex</Typography>
          <Button color="inherit">Search</Button>
        </Toolbar>
      </AppBar>
      <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "100vh",
        }}>
        {pokemonData.map((pokemon) => (
          <Card key={pokemon.id} style={{ margin: "16px", width: "200px", padding: "5px", minHeight: "400px"  }}>
            <CardMedia
              component="img"
              alt={pokemon.name}
              height="140"
              image={pokemon.sprites.front_default}
            />
            <CardContent>
              <Typography variant="h6">{pokemon.name}</Typography>
              <List>
                {pokemon.moves.slice(0, 4).map((move, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={move.move.name} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
