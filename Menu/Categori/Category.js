import React , {Component} from 'react';
import {Image,View} from 'react-native'
import {Content,Card,CardItem,Body,Text,Button, Container} from 'native-base'
import Footers from '../Masakan/Footers'
import axios from 'axios'

export default class Category extends Component {


    constructor(){
        super();
        this.state={
            dataCategory:[],
            dataCollections:[]
        }
    }
    getDataCollection(){
        axios.get(`https://developers.zomato.com/api/v2.1/collections?city_id=74`,{headers:{"user-key":"9c0483270b95c286dd1b7aba9e90cfe2"}})
        .then((res)=>{
            this.setState({
                dataCollections:res.data.collections
            })
        })
    }
    getDataCategory=()=>{
        axios.get('https://developers.zomato.com/api/v2.1/categories',{headers:{"user-key":"9c0483270b95c286dd1b7aba9e90cfe2"}})
        .then((res)=>{
            this.setState({
                dataCategory:res.data.categories
            })
        })
    }
    componentDidMount(){
        this.getDataCategory();
        this.getDataCollection();
    }
    static navigationOptions={header:null}
    render(){
        return(
           <View style={{flex:1}}>
               <Container style={{flex:3}}>
               <Content>
                   {this.state.dataCollections.map((data,key)=>{
                       return (
                        <Card key={key}> 
                        <CardItem cardBody>
                            <Image 
                            style={{height:200,width:null,flex:1}}
                            source={{uri:data.collection.image_url}}/>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>{data.collection.title}</Text>
                       <Text note>{data.collection.description}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                       )
                   })}
                   
               </Content>
               </Container>

               <Container style={{flex:1}}>
               <Text style={{margin:10}}>Category</Text>
               <Content horizontal>
                   {this.state.dataCategory.map((data,key)=>{
                       return(
                        <Button style={{margin:10}} key={key}>
                        <Text>{data.categories.name}</Text>
                        </Button>
                       )
                   })}
                
               </Content>
               </Container>
               <Footers/>
           </View>
        )

        
    }
}