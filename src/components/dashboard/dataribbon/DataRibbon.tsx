import React from "./index";
import { Grid } from "@mui/material";
import DataCard from "@/components/dashboard/datacard/DataCard";
import scss from "@/styles/DataRibbon.module.scss";

const DataRibbon = () => {
  const data = [
    {
      title: "Total Patients",
      value: "462",
      description: "The total no of patients in the current financial year",
    },
    {
      title: "Total Collection",
      value: "$25,732.53",
      description: "The total sales of the current financial year",
    },
    {
      title: "Avg. Daily Collection",
      value: "$159.30",
      description: "The average order value for all sales this current financial year",
    },
    {
      title: "Conversion rate",
      value: "0.61%",
      description: "How many pitches become sales",
    },
  ];
  
  return (
    <Grid container gap={2} className={scss.dataRibbon}>
      {data.map((item, index) => (
        <Grid key={index}>
          <DataCard
            title={item.title}
            value={item.value}
            description={item.description}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DataRibbon;