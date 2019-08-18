import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AppRegistry, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ImageBackground} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Config from 'react-native-config';
export default class ResultScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.navigation.getParam('ign'),
			champion: null,
			data: [],
			API_KEY: 'RGAPI-bc2aaae2-0b29-44ff-9f1d-c9fd63ff9d5a',
			lastTimePlayed: '',
			champ: this.props.navigation.getParam('champ'),
			champName: null,
		};
	}
	static navigationOptions= ({navigation}) => ({
		title: 'Results',
	});
	displayError(){
		return <Text>{'An error occurred.'}</Text>
	}
	componentDidMount() {
    	this.getInfo(); // calls summoner api to retrieve summoner id, and use in callchampionMastery()
    	this.getChamp(this.state.champ);
	}

	getInfo(){
		const { name, API_KEY } = this.state;
		const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`;
		fetch(url)
			.then(infoRes => infoRes.json())
			.then(infoRes => {
				this.callchampionMastery(infoRes.id)
			});
	};
	getChamp(champ){
		var upperChamp;
		upperChamp = champ.charAt(0).toUpperCase() + champ.slice(1);
		const champData = `http://ddragon.leagueoflegends.com/cdn/8.15.1/data/en_US/champion.json`;
		fetch(champData)
			.then(champRes => champRes.json())
			.then(champRes => {
				this.setState({champion: champRes.data[upperChamp].key});
			});
		this.setState({champName: upperChamp});
	};

	callchampionMastery(summonerID){
		const { champion, API_KEY } = this.state;//https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/f-wWhHFp5TRE8Lj3VzJT1oUVbohavS3cnSVwJ8m-Erv9E0k/by-champion/40?api_key=RGAPI-9e4d2348-3719-4fdc-ab21-8c34089fef02
		const champMastery = `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerID}/by-champion/${champion}?api_key=${API_KEY}`;
		fetch(champMastery)
			.then(champData => champData.json())
			.then(champData => {
				this.setState({ lastTimePlayed : JSON.stringify(champData.lastPlayTime)})
				this.setState({ data: champData});
			});
	};

	lastTimePlayedLocal(){
		var time = this.state.lastTimePlayed;
		if (time){
			var utcTime = moment.utc(parseInt(time)).format();
	  		return ((new Date(utcTime)).toString());
		}
	  	
	}
	render() {
	  	if (this.state.data.status){
	  		return(
	  			<ImageBackground source={require('../img/poro.png')} style={styles.container}>
	    		<View style={styles.container}>
	    		<Text style={styles.text}>{'Error: Sorry data cannot be loaded'}</Text>
	    		</View>
	    		</ImageBackground>
	    	)
	    }
    	else{
    		return(
    			<ImageBackground source={require('../img/marksman.png')} style={styles.bardContainer}>
	    		<View style={styles.container}>
	    			<Text style={styles.item}>{'Welcome! ' + this.state.name}</Text>
			        <Text style={styles.item} >{'Your champion level is ' + this.state.data.championLevel}</Text>
			        {this.displayChestGranted()}
			        {this.displayNextLevelPoints()}
			        <Text style={styles.item}>{'Last time you played ' + this.state.champName +' was on ' + this.lastTimePlayedLocal()}</Text>
			    </View>
			    </ImageBackground>
		    );
    	}
    	 
	}
	displayNextLevelPoints(){
		if (JSON.stringify(this.state.data.championPointsUntilNextLevel)){
			return <Text style={styles.item} >{'You have reached maximum champion level for ' + this.state.champName + '.'}</Text>
		}
		else{
			return <Text style={styles.item} >{'Points until next level: ' + this.state.data.championPointsUntilNextLevel}</Text>
		}
	}
	displayChestGranted(){
		if (!JSON.stringify(this.state.data.chestGranted)){
			return <Text style={styles.item} >{'You have not been granted a chest this season.'}</Text>
		}
		else{
			return <Text style={styles.item} >{'Chest has already been granted this season!'}</Text>
		}
	}

}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		width: '104.5%',
		height: '100%',

	},
	bardContainer: {
		flex: 1,
		alignItems: 'center',
		width: '100%',
		height: '100%',
	},
	text:{
		fontSize: 15,
		paddingTop: 80,
	},
	item:{
		top: 80,
		color: 'black',
		fontSize: 20,
		paddingHorizontal: 10,
	},
});



AppRegistry.registerComponent('ResultScreen', () => ResultScreen);