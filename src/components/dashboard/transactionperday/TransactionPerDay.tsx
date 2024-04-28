import React from "react";
import scss from "@/styles/TransactionPerDay.module.scss";
import { Card, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import DataChart from "@/components/datachart/DataChart";
import { lineChartData } from "@/components/mockData";

type CardComponentProps = {
  title: string;
  value: string;
  percentage: string;
};

const TransactionsPerDay = () => {
  const theme = useTheme();

  const CardComponent: React.FC<CardComponentProps> = ({ title, value, percentage }) => (
    <Card className={scss.card} variant={"outlined"}>
      <div className={scss.cardTitle}>
        <Typography>{title}</Typography>
      </div>
      <div className={scss.cardValue}>
        <Typography>{value}</Typography>
        <Typography color={theme.palette.success.main} fontSize={11}>
          {percentage}
        </Typography>
      </div>
    </Card>
  );
  
  const cardData = [
    {
      title: "Total Patients Today",
      value: "35",
      percentage: "428.7%",
    },
    {
      title: "Total Fit Today",
      value: "28",
      percentage: "899.4%",
    },
    {
      title: "Refunds",
      value: "0",
      percentage: "0",
    },
  ];
  
  return (
    <Grid container gap={2} className={scss.wrapper}>
      <Paper className={scss.transactions}>
        <div className={scss.chart}>
          <Typography>Transactions Per Day</Typography>
          <DataChart type={"line"} data={lineChartData} />
        </div>
        <div className={scss.cardWrapper}>
          {cardData.map((card, index) => (
            <CardComponent key={index} {...card} />
          ))}
        </div>
      </Paper>
    </Grid>
  );
};

export default TransactionsPerDay;