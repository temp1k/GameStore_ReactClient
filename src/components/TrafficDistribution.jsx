import React, {lazy, useEffect, useState} from 'react';
import {Avatar, Grid, Stack, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';

import DashBoardCard from "./DashBoardCard";

const Chart = lazy(() => import('react-apexcharts'));


const TrafficDistribution = ({values}) => {
    const users = values;
    const [testFinish, setTestFinish] = useState(0);
    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const error = theme.palette.error.main;
    const secondary = theme.palette.secondary.light;
    const successlight = theme.palette.success.light;

    // chart
    const optionscolumnchart = {
        chart: {
            type: 'donut',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
            height: 170,
        },
        colors: ['#1f97ed', '#fc7f58'],
        plotOptions: {
            pie: {
                startAngle: 0,
                endAngle: 360,
                donut: {
                    size: '75%',
                    background: 'transparent',
                },
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
        stroke: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        responsive: [
            {
                breakpoint: 991,
                options: {
                    chart: {
                        width: 120,
                    },
                },
            },
        ],
    };
    const seriescolumnchart = [testFinish, users.length - testFinish];

    useEffect(() => {
        var count = 0;
        users.map((item) => {
            if (item.isBlock) {
                count++;
            }
        });
        setTestFinish(count);
    }, []);

    return (
        <DashBoardCard title="Заблокированные пользователи">
            <Grid container spacing={3}>
                {/* column */}
                <Grid item xs={6} sm={7}>
                    <Typography variant="h3" fontWeight="700">
                        {testFinish}
                    </Typography>
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={1} mt={1} alignItems="center">
                        <Stack direction="row">
                            {/*<Avatar sx={{ bgcolor: successlight, width: 21, height: 21 }}>*/}
                            {/*  <IconArrowUpLeft width={18} color="#39B69A" />*/}
                            {/*</Avatar>*/}
                            <Typography variant="subtitle2" fontWeight="600">
                                {Math.ceil((testFinish / users.length) * 100)}%
                            </Typography>
                        </Stack>
                        <Typography variant="subtitle2" color="textSecondary">
                            заблокировано
                        </Typography>
                    </Stack>
                    <Stack spacing={3} mt={3} direction="row">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar
                                sx={{
                                    width: 9,
                                    height: 9,
                                    bgcolor: primary,
                                    svg: {display: 'none'},
                                }}></Avatar>
                            <Typography variant="subtitle2" fontSize="12px" color="textSecondary">
                                Заблокировано
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar
                                sx={{
                                    width: 9,
                                    height: 9,
                                    bgcolor: error,
                                    svg: {display: 'none'},
                                }}></Avatar>
                            <Typography variant="subtitle2" fontSize="12px" color="textSecondary">
                                Не заблокировано
                            </Typography>
                        </Stack>
                    </Stack>
                </Grid>
                {/* column */}
                <Grid item xs={6} sm={5}>
                    <Chart
                        options={optionscolumnchart}
                        series={seriescolumnchart}
                        type="donut"
                        width={'100%'}
                        height="150px"
                    />
                </Grid>
            </Grid>
        </DashBoardCard>
    );
};

export default TrafficDistribution;