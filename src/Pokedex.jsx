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
import { useSquadContext } from "./SquadContext";

const Pokedex = () => {
  const { squad, addToSquad, removeFromSquad, isBattleEnabled } =
    useSquadContext();
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
      <h1 style={{ marginLeft: "21px" }}>My Squad</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {squad.map((pokemon) => (
          <Card
            key={pokemon.id}
            style={{
              margin: "16px",
              width: "200px",
              padding: "5px",
              minHeight: "400px",
            }}
          >
            <CardMedia
              component="img"
              alt={pokemon.name}
              height="140"
              image={pokemon.sprites.front_default}
            />
            <CardContent>
              <Typography variant="h6" style={{ textAlign: "center" }}>
                {pokemon.name}
              </Typography>
              <List>
                {pokemon.moves.slice(0, 4).map((move, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={move.move.name} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => removeFromSquad(pokemon)}
              >
                Remove
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "10px 0"
        }}
      >
        {isBattleEnabled && (
          <Button variant="contained" color="primary">
            Battle
          </Button>
        )}
      </div>
      <h1 style={{ marginLeft: "21px" }}>All Pokemon</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {pokemonData.map((pokemon) => (
          <Card key={pokemon.id} style={{
            margin: "16px",
            width: "200px",
            padding: "5px",
            minHeight: "400px",
          }}>
            <CardMedia
              component="img"
              alt={pokemon.name}
              height="140"
              image={pokemon.sprites.front_default}
            />
            <CardContent>
              <Typography variant="h6" style={{ textAlign: "center" }}>
                {pokemon.name}
              </Typography>
              <List style={{ padding: 0 }}>
                {pokemon.moves.slice(0, 5).map((move, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={move.move.name} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions style={{ display: "flex", justifyContent: "center" }}>
              {squad.length < 6 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToSquad(pokemon)}
                >
                  Add
                </Button>
              )}
              {/* {squad.includes(pokemon) && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => removeFromSquad(pokemon)}
                >
                  Remove
                </Button>
              )} */}
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
