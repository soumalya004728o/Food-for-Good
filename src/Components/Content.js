import React from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";
const Content = () => {
  return (
    <React.Fragment>
      <Grid container spacing={2} className="content__row">
        <Grid item xs={12} sm={4}>
          <ProductCard
            id={1}
            avatar="O"
            image="https://www.bigbasket.com/media/uploads/p/xxl/10000148_28-fresho-onion.jpg"
            image_title="Onion"
            title=" Medium Sized Onions"
            subtitle="November 08, 2020"
            desc="Onions from farms of Nasik"
            price="74"
            quantity="1kg"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ProductCard
            id={2}
            avatar="B"
            image="https://www.bigbasket.com/media/uploads/p/l/20000745_5-fresho-bottle-gourd.jpg"
            image_title="Bottle Gourd"
            title="Fresho Bottle Gourd / Lauki"
            subtitle="November 07, 2020"
            desc="Fresh bottle groud from Karui village."
            price="17.20"
            quantity="~500g"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ProductCard
            id={3}
            avatar="T"
            image="https://www.bigbasket.com/media/uploads/p/l/40004374_12-fresho-turmeric-fresh.jpg"
            image_title="Fresh Turmeric"
            title="Fresho Turmeric - Fresh"
            subtitle="November 08, 2020"
            desc="Turmeric from Purba Mednipur"
            price="25"
            quantity="250g"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ProductCard
            id={4}
            avatar="S"
            image="https://www.bigbasket.com/media/uploads/p/l/40042988_1-fresho-spine-gourd.jpg"
            image_title="Fresh Spine Gourd / Kakrol"
            title="Fresh Spine Gourd / Kakrol"
            subtitle="November 07, 2020"
            desc="Spine Groud from Sankrail"
            price="21"
            quantity="250g"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ProductCard
            id={5}
            avatar="M"
            image="https://www.bigbasket.com/media/uploads/p/l/10000273_13-fresho-mushrooms-button.jpg"
            image_title="Fresho Mushrooms - Button, 1 Pack (Approx .180g - 200 g)"
            title="Fresho Mushrooms - Button"
            subtitle="November 06, 2020"
            desc="Mushrooms from Murshidabad"
            price="79"
            quantity="200g"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Content;
