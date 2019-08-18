
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard, ImageBackground } from 'react-native';

export default class HomeScreen extends Component {
	static navigationOptions= ({navigation}) => ({
		title: 'Welcome',
	});
	
	constructor(props) {
		super(props);
		this.state = {
			ign: '',
			champ: '',
		};
	}
	input = () => {
		this.props.navigation.navigate('ResultScreen', {ign: this.state.ign, champ: this.state.champ});
		Keyboard.dismiss();
	}
	render(){
		return(
			<ImageBackground source={require('../img/logo.png')} style={styles.container}>
			<KeyboardAvoidingView behavior="padding">
				<View style = {styles.buttonContainer}>
					<TouchableOpacity 
					style = {styles.button} 
					onPress={(this.input)}>
							<Text style = {styles.buttonText}> Go!</Text>
					</TouchableOpacity>
				</View>
				<View style = {styles.textContainer}>
					<TextInput style = {styles.text}
						autoCapitalize="none" 
						returnKeyType="next"
						autoCorrect={false}
						placeholder="Please enter your IGN!"
						onChangeText={ign => this.setState({ign})}
					/>
				</View>
				<View style = {styles.textContainer}>
					<TextInput style = {styles.text}
						autoCapitalize="none"
						returnKeyType="go" 
						autoCorrect={false}
						placeholder="Please enter your champion!"
						onChangeText={champ => this.setState({champ})}
					/>
				</View>
			</KeyboardAvoidingView>
			</ImageBackground>
		);
	}

}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		resizeMode: 'cover',
	},
	buttonContainer:{
		flexDirection: 'row',
		alignSelf: 'center',
		backgroundColor: '#2B7A77',
		borderRadius: 15,
		height: 40,
		top: 400,
		width: 100,

	},
	text:{
		flex: 1,
		fontSize: 20,
	},
	buttonText:{
		flex: 1,
		fontSize: 20,
		color: '#ffff',
	},
	button:{
		height: 30,
		fontSize: 5,
		paddingHorizontal: 30,
		alignSelf: 'center',
	},
	textContainer:{
		top: 250,
		marginBottom: 10,
		marginHorizontal: 30,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#ffff',
		padding: 10,
		borderRadius: 20,
		height: 40,
		width: 330,
	},
});



AppRegistry.registerComponent('HomeScreen', () => HomeScreen);