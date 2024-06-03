import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    Pressable,
    FlatList,
    StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import Header from "@/components/layout/Header";
import images from "@/assets/images";
import CustomImage from "@/components/Image";
import SkeletonExpo from "moti/build/skeleton/expo";
import MenuHome from "@/components/MenuHome";
import Slider from "@/components/Slider";
import axios from "axios";
import Card from "@/components/Card";
import Separate from "@/components/Separate";
import Colors from "@/constants/Colors";
import { Product } from "@/store/interfaces";
import getAllProduct from "@/services/getAllProduct";

const Store = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [listProductArrivals, setListProductArrivals] = useState<Product[]>([]);
    const [page, setPage] = useState(0);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    useEffect(() => {
        fetchApi(page);
    }, [page]);

    const fetchApi = async (page: number) => {
        try {
            if (page === 0) {
                setIsLoading(true);
            } else {
                setIsFetchingMore(true);
            }
            const response = await axios.get(`http://localhost:8070/api/v1/Products1/paged?page=${page}&sizepage=4`);
            const data = response.data.data;

            setListProductArrivals((prevProducts) => page === 0 ? data : [...prevProducts, ...data]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setIsFetchingMore(false);
        }
    };

    const handleLoadMore = () => {
        if (!isFetchingMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const renderFooter = () => {
        return isFetchingMore ? (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE",
                }}
            >
                <ActivityIndicator animating size="large" color={Colors.primary.background} />
            </View>
        ) : null;
    };

    return (
        <View className="flex-1 bg-white">
            <Stack.Screen options={{ header: () => <Header isBack={false} /> }} />
            <View className="mt-[53]">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="flex-row flex-wrap items-center justify-center px-4 gap-2 mt-3 ">
                        <View className="">
                            <SkeletonExpo colorMode="light" width={150} height={100} />
                        </View>
                        <View className="">
                            <SkeletonExpo colorMode="light" width={150} height={100} />
                        </View>
                        <View className="">
                            <SkeletonExpo colorMode="light" width={150} height={100} />
                        </View>
                        <View className="">
                            <SkeletonExpo colorMode="light" width={150} height={100} />
                        </View>
                    </View>

                    <MenuHome />
                    <Slider />

                    <Separate color="#EEE" />

                    <View className="ml-4">
                        <Text className="text-lg font-extrabold">New Arrivals</Text>
                        {isLoading ? (
                            <ActivityIndicator size={'large'} color={Colors.primary.background} style={{ marginTop: 8 }} />
                        ) : (
                            <ScrollView
                                className="mt-4 py-3 space-x-3 "
                                horizontal={true}
                                showsVerticalScrollIndicator={false}
                            >
                                {listProductArrivals.map((item) => {
                                    return (
                                        <Pressable key={item.productID}>
                                            <Card data={item} width={145} height={189} />
                                        </Pressable>
                                    );
                                })}
                            </ScrollView>
                        )}
                    </View>

                    <Separate color="#EEE" />

                    <View className="space-y-6 mx-4">
                        <Text className="text-lg font-extrabold ">Suggestion for you</Text>

                        <FlatList
                            data={listProductArrivals}
                            renderItem={({ item }) => (
                                <Card data={item} width={145} height={189} />
                            )}
                            keyExtractor={(item) => item.productID.toString()}
                            numColumns={2}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={renderFooter}
                            columnWrapperStyle={{
                                marginBottom: 5,
                                padding: 5,
                            }}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default Store;
