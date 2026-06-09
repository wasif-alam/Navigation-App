import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const ChatHeader = ({ navigation, user }) => {
  return (
    <LinearGradient
      colors={['#141E30', '#243B55']} // 🌈 premium gradient
      style={styles.container}
    >

      {/* LEFT SECTION */}
      <View style={styles.leftSection}>

        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Avatar + Online Dot */}
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: user?.avatar }}
            style={styles.avatar}
          />
          {user?.status === 'online' && <View style={styles.onlineDot} />}
        </View>

        {/* Name + Status */}
        <View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.status}>
            {user?.status === 'online' ? 'Online' : 'Last seen recently'}
          </Text>
        </View>

      </View>

      {/* RIGHT SECTION */}
      <View style={styles.rightSection}>

        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="call-outline" size={22} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="videocam-outline" size={22} color="#fff" />
        </TouchableOpacity>

      </View>

    </LinearGradient>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 10,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarWrapper: {
    marginLeft: 10,
    marginRight: 10,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },

  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00FF94',
    borderWidth: 2,
    borderColor: '#141E30',
  },

  name: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  status: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 2,
  },

  rightSection: {
    flexDirection: 'row',
  },

  iconBtn: {
    marginLeft: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 8,
    borderRadius: 20,
  },
});