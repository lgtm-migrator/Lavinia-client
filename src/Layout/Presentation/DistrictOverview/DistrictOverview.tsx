﻿import * as React from "react";
import ReactTable from "react-table";
import { DistrictResult } from "../../../computation";
import { toMin, toMax, toMean, toSum } from "../../../utilities/reduce";
import { getMostVulnerableSeat } from "../../../utilities/district";

export interface DistrictOverviewProps {
    districtResults: DistrictResult[];
    districtWidth: number;
    decimals: number;
}

export class DistrictOverview extends React.Component<DistrictOverviewProps, {}> {
    render() {
        const data = this.props.districtResults;
        const decimals = this.props.decimals;
        const highestVotingPower = data.map((value) => value.votesPerSeat).reduce(toMin);
        const lowestVotingPower = data.map((value) => value.votesPerSeat).reduce(toMax);
        const averageVotingPower = data.map((value) => value.votesPerSeat).reduce(toMean);
        const highestVsAverageInPercentage = (1 / highestVotingPower / (1 / averageVotingPower)) * 100;
        const lowestVsAverageInPercentage = (1 / lowestVotingPower / (1 / averageVotingPower)) * 100;
        const highestVsLowestInPercentage = (1 / highestVotingPower / (1 / lowestVotingPower)) * 100;
        const mostInfluentialDistrict = (
            <strong>{data.find((entry) => entry.votesPerSeat === highestVotingPower)!.name}</strong>
        );
        const leastInfluentialDistrict = (
            <strong>{data.find((entry) => entry.votesPerSeat === lowestVotingPower)!.name}</strong>
        );
        const mostVulnerable = getMostVulnerableSeat(data);
        return (
            <React.Fragment>
                <h2>Fylkesoversikt</h2>
                <p>
                    {"En stemme i "}
                    {mostInfluentialDistrict}
                    {" hadde mest innflytelse, og telte "}
                    {highestVsAverageInPercentage.toFixed(decimals) + "%"}
                    {" av en gjennomsnittlig stemme"}
                    {", mens en stemme i "}
                    {leastInfluentialDistrict}
                    {" hadde minst innflytelse, og bare telte "}
                    {lowestVsAverageInPercentage.toFixed(decimals) + "%."}
                    {" En stemme i det mest innflytelsesrike fylket telte altså "}
                    {highestVsLowestInPercentage.toFixed(decimals) + "%"}
                    {" mer enn en stemme i det minst innflytelsesrike fylket."}
                </p>
                <p>
                    {"Det mest utsatte sistemandatet relativt til kvotient var i "}
                    {<strong>{mostVulnerable.district}</strong>}
                    {" og ble vunnet av "}
                    {mostVulnerable.winner.partyCode}
                    {". "}
                    {mostVulnerable.runnerUp.partyCode}
                    {" ville trengt "}
                    {mostVulnerable.moreVotesToWin.toFixed(0)}
                    {" flere stemmer for å vinne det."}
                </p>
                <ReactTable
                    className="-highlight -striped"
                    defaultPageSize={this.props.districtResults.length}
                    showPaginationBottom={false}
                    data={data}
                    columns={[
                        {
                            Header: "Fylke",
                            accessor: "name",
                            minWidth: this.props.districtWidth * 10,
                            Footer: (
                                <span>
                                    <strong>Alle fylker</strong>
                                </span>
                            ),
                        },
                        {
                            Header: "Stemmer",
                            accessor: "votes",
                            Footer: (
                                <span>
                                    <strong>{data.map((value) => value.votes).reduce(toSum, 0)}</strong>
                                </span>
                            ),
                        },
                        {
                            Header: "Distrikt",
                            accessor: "districtSeats",
                            Footer: (
                                <span>
                                    <strong>{data.map((value) => value.districtSeats).reduce(toSum, 0)}</strong>
                                </span>
                            ),
                        },
                        {
                            Header: "Utjevning",
                            accessor: "levelingSeats",
                            Footer: (
                                <span>
                                    <strong>{data.map((value) => value.levelingSeats).reduce(toSum, 0)}</strong>
                                </span>
                            ),
                        },
                        {
                            Header: "Sum",
                            accessor: "totalSeats",
                            Footer: (
                                <span>
                                    <strong>{data.map((value) => value.totalSeats).reduce(toSum, 0)}</strong>
                                    <br />
                                </span>
                            ),
                        },
                        {
                            Header: "Stemmer/mandat",
                            accessor: "votesPerSeat",
                            Footer: (
                                <span>
                                    <strong>{averageVotingPower.toFixed(decimals)}</strong>
                                </span>
                            ),
                        },
                    ]}
                />
            </React.Fragment>
        );
    }
}
