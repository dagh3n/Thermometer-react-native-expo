import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Thermometer = ({ value, maxValue }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [gradientColors, setGradientColors] = useState(['#a7bed3',])
    const [gradientLocations, setGradientLocations] = useState([1])
    useEffect(() => {
        setIsLoading(true)
        const perc = value / maxValue;
        console.log(perc)
        if (perc <= 0.3) {
            setGradientColors(['#a7bed3', '#a7bed3'])
            setGradientLocations([0, 1])
        } else if (perc <= 0.8 && perc > 0.3) {
            setGradientColors(['#ecd096', '#a7bed3',])
            setGradientLocations([0.3 * perc, 0.7 * perc])
        } else {
            setGradientColors(['#ea522b', '#ecd096', '#a7bed3',])
            setGradientLocations([0.01 * perc, 0.3 * perc, 0.7 * perc])
        }
        setIsLoading(false)
    }, [value,maxValue]);


    // '#ea522b',
    // '#ecd096',



    // [0.05 * perc, 0.4 * perc, 0.7 * perc]; // Adjust the locations as needed

    return !isLoading && (
        <View style={styles.container}>
            <View style={styles.thermometer}>
                <LinearGradient
                    colors={gradientColors}
                    locations={gradientLocations}
                    style={[styles.mercury, { height: `${Math.min((value/maxValue) * 100, 100)}%` }]}
                />
            </View>
            {/* <View style={styles.thermometerStyle}/> */}
            <View style={[styles.bottomCircle, { backgroundColor: '#a7bed3' }]} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    border: {

    },
    thermometer: {
        backgroundColor: '#ccc',
        height: 170,
        width: 30,
        marginTop: 10,
        position: 'relative',
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 15, // Adjust the borderRadius as needed
        overflow: 'hidden', // Clip the child (mercury) within the rounded corners
    },
    thermometerStyle: {
        backgroundColor: '#a7bed3',
        height: 30,
        width: 20,
        marginTop: 10,
        position: 'absolute',
        borderRadius: 0, // Adjust the borderRadius as needed
        overflow: 'hidden', // Clip the child (mercury) within the rounded corners
    },
    mercury: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderRadius: 15,
        // Adjust the borderRadius to match the parent
    },
    bottomCircle: {
        position: 'absolute',
        bottom: 0,
        width: 50, // Diameter of the circle
        height: 50, // Diameter of the circle
        borderRadius: 25,// Half of the width/height to make it a circle
        borderWidth: 5,
        borderColor: 'white',
    },
    bottomCircleBorder: {
        position: 'absolute',
        bottom: 0,
        width: 60, // Diameter of the circle
        height: 60, // Diameter of the circle
        borderRadius: 30,// Half of the width/height to make it a circle

    },
    temperature: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
});

export default Thermometer;
