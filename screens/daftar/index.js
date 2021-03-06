import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Surface, TextInput,Button, HelperText  ,Title } from 'react-native-paper';
import theme from "../../config/theme";
import { auth, firestore , FieldValue} from "../../components/FirebaseProvider";
import isEmail from "validator/lib/isEmail";

export default function LandingScreen() {
    const navigation = useNavigation();

    const [form, setForm] = useState({
        nama: '',
        email: '',
        pasword: '',
        ulangi_pasword: ''
    });

    const [error, setError] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = name => text => {
        setForm({
            ...form,
            [name]: text
        });
        setError({
            ...error,
            [name]: ''
        })
    };

    const validate = () => {
        let newErrors = {};

        if (!form.nama) {
            newErrors.nama = "Nama wajib diisi";
        }

        if (!form.email) {
            newErrors.email = "Email wajib diisi";
        } else if (!isEmail(form.email)) {
            newErrors.email = "Email tidak valid";
        }

        if (!form.password) {
            newErrors.password = "Password wajib diisi";
        }

        if (!form.ulangi_password) {
            newErrors.ulangi_password = "Ulangi Password wajib diisi";
        } else if (form.ulangi_password !== form.password) {
            newErrors.ulangi_password = "Ulangi Password tidak sama dengan Password";
        }

        return newErrors;
    };

    const handleSubmit = async () => {


        const findErrors = validate();

        if (Object.values(findErrors).some(message => message !== "")) {
            setError(findErrors);
        } else {
            setIsSubmitted(true);
            try {
                const { user } = await auth.createUserWithEmailAndPassword(
                    form.email,
                    form.password
                );

                await firestore.doc(`/profiles/${user.uid}`).set({
                    nama: form.nama,
                    createdAt: FieldValue.serverTimestamp()
                });
            } catch (e) {
                let newError = {};
                setIsSubmitted(false);
                switch (e.code) {
                    case "auth/email-already-in-use":
                        newError.email = "Email sudah terdaftar";
                        break;
                    case "auth/invalid-email":
                        newError.email = "Email tidak valid";
                        break;
                    case "auth/weak-password":
                        newError.password = "Password lemah";
                        break;
                    case "auth/operation-not-allowed":
                        newError.email = "Metode email dan password tidak didukung";
                        break;
                    default:
                        newError.email = "Terjadi kesalahan silahkan coba lagi";
                        break;
                }

                setError(newError);
            }

        }
    };


    return (
        <View style={styles.container}>
            <Image style={styles.bg} source={require("../../assets/bg.png")} />
            <View style={[styles.bgColor, styles.bg]} />
            <View style={styles.logo} >
                <Image source={require("../../assets/logo.png")} />
            </View>
            <View style={styles.content}>
                <Surface style={styles.surface}>
                    <Title style={styles.title}>Buat Akun Baru</Title>
                    <View style={styles.textInput}>
                        <TextInput
                            label="Username*"
                            placeholder="masukan username..."
                            mode="outlined"
                            dense
                            onChangeText={handleChange("nama")}
                            value={form.nama}
                            error={error.nama ? true:false}
                        />
                        <HelperText type="error" visible={error.nama ? true : false}>{error.nama}</HelperText>
                        <TextInput
                            label="Email*"
                            placeholder="masukan Email..."
                            mode="outlined"
                            dense
                            onChangeText={handleChange("email")}
                            value={form.email}
                            error={error.email ? true:false}
                        />
                        <HelperText type="error" visible={error.email ? true : false}>{error.email}</HelperText>
                        <TextInput
                            label="Password*"
                            placeholder="masukan pasword..."
                            mode="outlined"
                            dense
                            secureTextEntry
                            onChangeText={handleChange("password")}
                            value={form.password}
                            error={error.password ? true:false}
                        />
                        <HelperText type="error" visible={error.password ? true : false}>{error.password}</HelperText>
                        <TextInput
                            label="Ulangi Password*"
                            placeholder="Ulangi Password..."
                            mode="outlined"
                            dense
                            secureTextEntry
                            onChangeText={handleChange("ulangi_password")}
                            value={form.ulangi_password}
                            error={error.ulangi_password ? true:false}
                        />
                        <HelperText type="error" visible={error.ulangi_password ? true : false}>{error.ulangi_password}</HelperText>
                        <View style={styles.buttons}>
                            <Button
                                // style={styles.btnDaftar}
                                mode="contained"
                                onPress={handleSubmit}
                                loading={isSubmitted}
                            >Daftar</Button>
                            <Button
                                style={styles.btnLogin}
                                mode="outlined"
                                onPress={() => { navigation.navigate("Login") }}
                            >Login</Button>
                        </View>
                    </View >
                </Surface>
               </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bg: {
        position: "absolute",
        width: "100%",
        height: "50%",
        borderBottomRightRadius: 200,
        borderBottomLeftRadius: 200,
    },
    bgColor: {
        backgroundColor: theme.colors.primary,
        opacity: .9
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        
    },
    surface: {
        width: "90%",
        padding: 24,
        paddingLeft: 28,
        paddingRight: 28,
        borderRadius: 4
    },
    title: {
        marginBottom: 16,
        textAlign: "center"
    },
    buttons: {
        width: "100%",
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    
    btnLogin: {
        borderColor: theme.colors.primary,
        borderWidth: 1
    }
})