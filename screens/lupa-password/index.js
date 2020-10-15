import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Surface, TextInput,Button, HelperText  ,Title } from 'react-native-paper';
import theme from "../../config/theme";
import { auth} from "../../components/FirebaseProvider";
import isEmail from "validator/lib/isEmail";

export default function LupaPasswordScreen() {
    const navigation = useNavigation();

    const [form, setForm] = useState({
        email: '',
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

        if (!form.email) {
            newErrors.email = "Email wajib diisi";
        } else if (!isEmail(form.email)) {
            newErrors.email = "Email tidak valid";
        }

        if (!form.password) {
            newErrors.password = "Password wajib diisi";
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
                const actionCodeSettings = {
                    url: `my-chat-app-7d2bb.firebaseapp.com`
                };

                await auth.sendPasswordResetEmail(form.email, actionCodeSettings);
                setInfo(`Cek kotak masuk email: ${
                    form.email
                    }, sebuah tautan untuk me-reset password telah dikirim!`)
            } catch (e) {
                let newError = {};



                switch (e.code) {
                    case "auth/user-not-found":
                        newError.email = "Email tidak terdaftar";
                        break;
                    case "auth/invalid-email":
                        newError.email = "Email tidak valid";
                        break;
                    default:
                        newError.email = "Terjadi kesalahan silahkan coba lagi";
                        break;
                }

                setError(newError);
            }
            setIsSubmitted(false);
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
                    <Title style={styles.title}>Lupa Password</Title>
                    <View style={styles.textInput}>
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
                        <View style={styles.buttons}>
                             <Button
                                // style={styles.btnLogin}
                                mode="contained"
                                loading={isSubmitted}
                                onPress={handleSubmit}
                            >Kirim</Button>
                            <Button
                                style={styles.btnLogin}
                                mode="outlined"
                                onPress={() => { navigation.navigate('Login')}}
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
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    lupaPassword: {
        alignSelf: "flex-start",
        marginTop: 16,
        marginBottom: 16
    }
})