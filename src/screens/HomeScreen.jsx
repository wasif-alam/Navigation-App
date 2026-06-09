import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Image, TextInput,
  ImageBackground, ActivityIndicator, Alert, Dimensions   
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import background_img from '../Assets/bg-img.png';
import logo from '../Assets/mokhsh_logo.png';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = (size) => (SCREEN_WIDTH / 375) * size;
const verticalScale = (size) => (SCREEN_HEIGHT / 812) * size;

const HomeScreen = ({ navigation, setIsLoggedIn }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://dummyjson.com/users?limit=20');

        const mapped = res.data.users.map((u, index) => ({
          id: String(u.id),
          name: `${u.firstName} ${u.lastName}`,
          message: u.email,
          time: index < 3 ? 'Just now' : '09:30 AM',
          avatar: u.image,
          status: index % 2 === 0 ? 'online' : 'offline',
        }));

        setUsers(mapped);
      } catch (err) {
        Alert.alert('Error', 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('Chat', { user: item })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />

      <View style={styles.middle}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.time}>{item.time}</Text>

        {item.unread > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground 
      source={background_img}
      style={{ flex: 1, color: '#1b315a' }}
      blurRadius={2}
      resizeMode="cover"
    >
      {/* <StatusBar barstyle="light-content"  */}

      {/* Glass Container */}
      <View style={styles.glassContainer}>

        {/* Top Header */}
  <View style={styles.topHeader}>
    <View style={styles.headerRow}>

      {/* Left Icon (Menu) */}
      {/* <TouchableOpacity>
        <Ionicons name="menu" size={22} color="#fff" />
      </TouchableOpacity> */}

      {/* Center Logo */}
      <Image source={logo} style={styles.logoImage} />

      {/* Right Icon (Logout) */}
      <TouchableOpacity onPress={handleLogout}>
      <Ionicons name="power" size={22} color="#fff" />
    </TouchableOpacity>

  </View>
</View>

        {/* Chat Header */}
        <View style={styles.chatHeader}>
          <Text style={styles.chatTitle}>Chat</Text>

          <View style={{ flexDirection: 'row' }}>
            {/* <Ionicons name="add" size={22} color="#fff" /> */}
            {/* <Ionicons name="ellipsis-vertical" size={20} color="#fff" style={{ marginLeft: 10 }} /> */}
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#1413133f" />
          <TextInput
            placeholder="Search... "
            placeholderTextColor="#0000004d"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {['All', 'Unread', 'Favorites', 'Groups'].map(tab => (
            <TouchableOpacity key={tab} style={styles.tab}>
              <Text style={styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={filteredUsers}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}

      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({

  glassContainer: {
    flex: 1,
    margin: 15,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingBottom: 10,
  },

  topHeader: {
  marginTop: 10,
  height: 60,
  padding: scale(8),
  backgroundColor: 'rgba(255,255,255,0.15)',
  marginHorizontal: scale(10),
  borderRadius: scale(20),
  marginBottom: verticalScale(10),
},

  logo: {
  width: 100,
  height: 30,
  resizeMode: 'contain',
  },

  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 5,
  },

  chatTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    margin: 10,
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 40,
  },

  searchInput: {
    flex: 1,
    color: '#000',
    marginLeft: 8,
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },

  tab: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  tabText: {
    color: '#fff',
    fontSize: 12,
  },

  chatItem: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderColor: 'rgba(255,255,255,0.3)',
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },

  middle: {
    flex: 1,
    marginLeft: 10,
  },

  name: {
    color: '#fff',
    fontWeight: 'bold',
  },

  message: {
    color: '#ddd',
    fontSize: 12,
  },

  right: {
    alignItems: 'flex-end',
  },

  time: {
    color: '#ccc',
    fontSize: 11,
  },

  badge: {
    backgroundColor: '#00A8E8',
    borderRadius: 10,
    paddingHorizontal: 6,
    marginTop: 5,
  },

  badgeText: {
    color: '#fff',
    fontSize: 10,
  },
  logoImage: {
  width: 140,
  height: 40,
  resizeMode: 'contain',
  opacity: 0.95,
},
headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

});