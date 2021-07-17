import { Card, CardContent, Typography } from "@material-ui/core";
import numeral from "numeral";
import "../styles/InfoBox.css";

const InfoBox = ({ title, dailyCase, totalCase, casePer1M }) => {
    return (
        <Card className="infoBox">
            <CardContent className="infoBox__content">
                <Typography color="textSecondary" className="infoBox__title">
                    {title}
                </Typography>

                <Typography
                    variant="h2"
                    color="textSecondary"
                    className="infoBox__dailyCase"
                >
                    {numeral(dailyCase).format("0.a")}
                </Typography>

                <Typography
                    color="textSecondary"
                    className="infoBox__totalCase"
                >
                    Total : {numeral(totalCase).format("0.a")}
                </Typography>

                <Typography
                    color="textSecondary"
                    className="infoBox__totalCase"
                >
                    Per 1M Population : {numeral(casePer1M).format("0.a")}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default InfoBox;
