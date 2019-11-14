import React , {Component} from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import {withNavigation} from 'react-navigation';

class Footers extends Component{
  static navigationOptions={header:null}
    render(){
        return(<Footer>
            <FooterTab>
              <Button vertical onPress={()=>{
               this.props.navigation.navigate("Homes")
              }}> 
                <Icon name="apps" />
                <Text>Home</Text>
              </Button>
              <Button vertical active
                onPress={()=>{
                  this.props.navigation.navigate("Masakan")
                }}
              >
                <Icon active name="pizza" />
                <Text>Masakan</Text>
              </Button>
              <Button vertical
              onPress={()=>{
                this.props.navigation.navigate("Kota")
              }}
              >
                <Icon name="home" />
                <Text>Kota</Text>
              </Button>
              <Button vertical
                onPress={()=>{
                  this.props.navigation.navigate("Category")
                }}>
                <Icon name="grid" />
                <Text>Kategori</Text>
              </Button>
            </FooterTab>
          </Footer>);
    }
}

export default withNavigation(Footers);