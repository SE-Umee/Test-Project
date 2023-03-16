import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { BarChart, PieChart } from "react-native-gifted-charts";
import { Container } from '../components/styles/style-sheet';
import { barData, pieData } from '../data/franchises';


const StateScreen = () => {
    return (
        <SafeAreaView style={{ ...Container.mainContainer, justifyContent: 'space-between' }}>
            <BarChart
                barWidth={12}
                width={300}
                height={200}
                noOfSections={3}
                barBorderRadius={4}
                frontColor="lightgray"
                data={barData}
                yAxisThickness={0}
                xAxisThickness={0}
                isAnimated
            />
            <View style={{ alignSelf: "center" }}>
                <PieChart
                    donut
                    showText
                    textColor="black"
                    innerRadius={65}
                    showTextBackground
                    textBackgroundColor="white"
                    textBackgroundRadius={20}
                    data={pieData}
                    textSize={10}
                />
            </View>
        </SafeAreaView>
    )
}

export default StateScreen

const styles = StyleSheet.create({})