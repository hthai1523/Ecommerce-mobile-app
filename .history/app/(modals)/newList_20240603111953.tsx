import React, {useEffect, useRef, useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Colors from "@/constants/Colors";
import {Product} from '@/store/interfaces';
import getAllProduct from "@/services/getAllProduct";
import CustomImage from "@/components/Image";
import {AntDesign} from "@expo/vector-icons";
import formatCurrency from "@/functions/formatCurrency";
import Button from "@/components/Button";
import useWishListStore from '@/store/wishListStore';
import {router} from "expo-router"; // Import the Zustand store

const NewList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [listProduct, setListProduct] = useState<Product[]>([]);
    const [inputText, setInputText] = useState<string>()

    const addToWishlist = useWishListStore((state) => state.addToWishlist);
    const wishList = useWishListStore((state) => state.wishlist)

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                const data = await getAllProduct();
                setProducts(data);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        };

        fetch();
    }, []);

    const handleWishlistToggle = (product: Product) => {
        setListProduct((prevList) => {
            if (prevList.some(p => p.id === product.id)) {
                return prevList.filter(p => p.id !== product.id);
            } else {
                return [...prevList, product];
            }
        });
    };

    const isProductInWishlist = (id: number) => {
        return listProduct.some(product => product.id === id);
    };

    const handleSubmit = () => {
            if (inputText && listProduct.length > 0) {
                addToWishlist(inputText, listProduct);
                // Clear input and listProduct array after submission

                setListProduct([]);
                router.back()
            } else {
                Alert.alert('Fill your wishlist title')
            }
    };

    const handleChangeInput = () => {

    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View style={styles.inputContainer}>
                <View style={styles.textInputWrapper}>
                    <TextInput
                        onChangeText={(text) => setInputText(text)}
                        value={inputText}
                        placeholder="Enter the title you like"
                        placeholderTextColor={Colors.primary.icon}
                        autoFocus
                        style={styles.textInput}
                        selectionColor={Colors.primary.background}
                    />
                </View>
                <Button onPress={handleSubmit} text='Add' primary={true} width={100} height={40}/>
            </View>

            {isLoading ? (
                <ActivityIndicator size={'large'} color={Colors.primary.icon}/>
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={styles.productContainer}>
                            <TouchableOpacity style={styles.productInfo}>
                                <CustomImage
                                    source={item.thumbnail}
                                    alt={item.title}
                                    style={styles.productImage}
                                />
                                <View style={styles.productDetails}>
                                    <Text numberOfLines={2} style={styles.productTitle}>{item.title}</Text>
                                    <View style={styles.productPriceContainer}>
                                        <Text style={styles.productPrice}>
                                            {formatCurrency(item.price)}
                                        </Text>
                                        <Text style={styles.productOldPrice}>
                                            {formatCurrency(item.price * 3)}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <Pressable style={styles.wishlistIcon} onPress={() => handleWishlistToggle(item)}>
                                {isProductInWishlist(item.id) ? (
                                    <AntDesign name="heart" size={20} color={"#e31b23"}/>
                                ) : (
                                    <AntDesign name="hearto" size={20} color={"#e31b23"}/>
                                )}
                            </Pressable>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
};

export default NewList;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
    },
    textInputWrapper: {
        backgroundColor: ' rgb(241 245 249)',
        flex: 1,
        marginRight: 8,
        borderRadius: 8,
    },
    textInput: {
        padding: 8,
        color: 'skyblue',
    },
    productContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    productInfo: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingLeft: 8,
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    productDetails: {
        width: '70%',
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    productPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: 'skyblue',
    },
    productOldPrice: {
        fontSize: 14,
        color: 'gray',
        textDecorationLine: 'line-through',
    },
    wishlistIcon: {
        padding: 8,
    },
});
