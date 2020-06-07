import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 420,
    height: "100%",
  },
  media: {
    height: 220,
  },
  listRoot: {
    textDecoration: "none",
    justifyContent: "space-between",
  },
  listText: {
    textTransform: "capitalize",
    maxWidth: 70,
    marginRight: 16,
  },
  cardHeader: {
    background: "rgba(100,100,100,.8)",
    color: "#fff",
    bottom: 0,
    width: '100%'
  },
}));

let characterKeys = ["status", "species", "gender", "origin", "location"];

export default function CharacterCard({ item }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} lg={3} sm={12} md={6}>
      <Card className={classes.root}>
        <Box position="relative">
        <CardMedia className={classes.media} image={item.image} />
        <Box position="absolute" px={2} py={1} className={classes.cardHeader}>
          <Typography component="div" variant="body1">
            {item.name}
          </Typography>
          <Typography
            component="div"
            variant="caption"
            noWrap
          >{`id: ${item.id} - created: ${item.created}`}</Typography>
        </Box>
        </Box>
        <List dense={true}>
          {characterKeys.map((label) => (
            <ListItem className={classes.listRoot} key={label}>
              <ListItemText className={classes.listText} primary={label} />
              <Typography variant="caption" align="right">
                {item[label]?.name || item[label]}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Card>
    </Grid>
  );
}
