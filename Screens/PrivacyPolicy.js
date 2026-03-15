import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PrivacyPolicy({ navigation }) {
    const handleEmailPress = () => {
        Linking.openURL("mailto:l226617@lhr.nu.edu.pk");
    };

  return (
    <View style={styles.container}>
      
      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.title}>Privacy Policy</Text>
      </View>

      {/* ---------- CONTENT ---------- */}
      <ScrollView style={styles.scroll}>
        
        {/* Introduction */}
        <Text style={styles.heading}>Introduction</Text>
        <Text style={styles.text}>
          These Terms and Conditions ("Terms", "Agreement") govern your access to and 
          use of the Herb Library mobile application and services (the "Use") operated 
          by NatureLens ("us", "we", or "our"). Your access to and use of the Service 
          is conditioned upon your acceptance of and compliance with these Terms. 
          These Terms apply to all visitors, users, and others who access or use the Service.
        </Text>
        <View style={styles.line} />

        {/* 1. Acceptance of Terms */}
        <Text style={styles.heading}>1. Acceptance of Terms</Text>
        <Text style={styles.text}>
          By creating an account, accessing, or using the Herb Library application, you 
          acknowledge that you have read, understood, and agree to be bound by these Terms. 
          If you do not agree to these Terms, you may not access or use the application.
        </Text>
        <Text style={styles.text}>
          We reserve the right to modify this Agreement from time to time. We will notify 
          you of any changes by posting the new Terms on this page. We encourage you to 
          review this Agreement periodically for any changes. Your continued use of the 
          application after any changes signifies your acceptance of the revised Terms.
        </Text>
        <View style={styles.line} />

        {/* 2. User Accounts */}
        <Text style={styles.heading}>2. User Accounts</Text>
        <Text style={styles.text}>
          When you create an account with us, you must provide information that is 
          accurate, complete, and current at all times. Failure to do so constitutes a 
          breach of the Terms, which may result in immediate termination of your account 
          on our Service.
        </Text>
        <Text style={styles.text}>
          You are responsible for safeguarding the password that you use to access the 
          Service and for any activities or actions under your password, whether your 
          password is with our Service or a third-party service.
        </Text>
        <Text style={styles.text}>
          You agree not to disclose your password to any third party. You must notify us 
          immediately upon becoming aware of any breach of security or unauthorized use 
          of your account.
        </Text>
        <View style={styles.line} />

        {/* 3. Intellectual Property */}
        <Text style={styles.heading}>3. Intellectual Property</Text>
        <Text style={styles.text}>
          The Service and its original content (excluding content provided by users), 
          features, and functionality are and will remain the exclusive property of Herb 
          Library and its licensors. The Service is protected by copyright, trademark, 
          and other laws of both the United States and foreign countries.
        </Text>
        <Text style={styles.text}>
          Our trademarks and trade dress may not be used in connection with any product 
          or service without the prior written consent of Herb Library.
        </Text>
        <View style={styles.line} />

        {/* 4. Use of Service */}
        <Text style={styles.heading}>4. Use of Service</Text>
        <Text style={styles.text}>
          You agree to use the Service only for lawful purposes and in a way that does 
          not infringe the rights of, restrict or inhibit anyone else's use and enjoyment 
          of the Service. Prohibited behavior includes harassing or causing distress or 
          inconvenience to any other user, transmitting obscene or offensive content, 
          or disrupting the normal flow of dialogue within the Service.
        </Text>
        <Text style={styles.text}>
          You must not misuse our Service by knowingly introducing viruses, trojans, 
          worms, logic bombs, or other material that is malicious or technologically 
          harmful. You must not attempt to gain unauthorized access to our Service, 
          the server on which our Service is stored, or any server, computer, or 
          database connected to our Service.
        </Text>
        <View style={styles.line} />

        {/* 5. Termination */}
        <Text style={styles.heading}>5. Termination</Text>
        <Text style={styles.text}>
          We may terminate or suspend your account immediately, without prior notice or 
          liability, for any reason whatsoever, including without limitation if you 
          breach the Terms.
        </Text>
        <Text style={styles.text}>
          Upon termination, your right to use the Service will immediately cease. If you 
          wish to terminate your account, you may simply discontinue using the Service.
        </Text>
        <Text style={styles.text}>
          All provisions of the Terms which by their nature should survive termination 
          shall survive termination, including, without limitation, ownership provisions, 
          warranty disclaimers, indemnity, and limitations of liability.
        </Text>
        <View style={styles.line} />

        {/* 6. Governing Law */}
        <Text style={styles.heading}>6. Governing Law</Text>
        <Text style={styles.text}>
          These Terms shall be governed and construed in accordance with the laws of 
          California, United States, without regard to its conflict of law provisions.
        </Text>
        <Text style={styles.text}>
          Our failure to enforce any right or provision of these Terms will not be 
          considered a waiver of those rights. If any provision of these Terms is held 
          to be invalid or unenforceable by a court, the remaining provisions of these 
          Terms will remain in effect. These Terms constitute the entire agreement 
          between us regarding our Service, and supersede and replace any prior 
          agreements we might have between us regarding the Service.
        </Text>
        <View style={styles.line} />

        {/* Contact */}
        <Text style={styles.heading}>Contact Us</Text>
        <Text style={styles.text}>
          If you have questions or comments about this, feel free to email us at:{"\n"}
            <TouchableOpacity onPress={handleEmailPress}>
                <Text style={[styles.text, { color: "#2e7d32", textDecorationLine: "underline" }]}>
                    l226617@lhr.nu.edu.pk
                </Text>
            </TouchableOpacity>
        </Text>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 10,
  },
  scroll: {
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 15,
    color: "#2e7d32",
  },
  text: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    marginBottom: 8,
  },
  line: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 15,
  },
});