/*************************
 ***developed this code***
 *************************/
using UnityEngine;
using TMPro;

public class PasswordStrengthGame : MonoBehaviour
{
    public TMP_InputField passwordInputField;
    public TextMeshProUGUI statusText;
    public TextMeshProUGUI timeToCrackText;

    private const string UppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private const string LowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    private const string Digits = "0123456789";
    private const string SpecialCharacters = "!@#$%^&*()-_=+[]{}|;:'\",.<>?";

    private void Start()
    {
        // Register a callback to update UI when the user finishes editing the password field
        passwordInputField.onEndEdit.AddListener(delegate { EvaluatePasswordStrength(); });
    }

    private void Update()
    {
        // Update UI continuously as the user types
        EvaluatePasswordStrength();
    }

    public void EvaluatePasswordStrength()
    {
        string password = passwordInputField.text;
        int strength = EvaluateStrength(password);
        UpdateStatus(strength);
        EstimateTimeToCrack(password);
    }

    private int EvaluateStrength(string password)
{
    int score = 1; // Initialize score to 1 (weak)
    int length = password.Length;

    // Add score based on length and variety of characters
    if (length >= 6)
    {
        score++; // Increment score if password length is at least 6 characters
        if (length > 9)
            score++; // Increment score if password length is greater than 10 characters
        if (length > 12)
            score++; // Increment score if password length is greater than 12 characters
    }

    // Add score based on character types
    bool hasUppercase = ContainsAny(password, UppercaseLetters);
    bool hasLowercase = ContainsAny(password, LowercaseLetters);
    bool hasDigits = ContainsAny(password, Digits);
    bool hasSpecial = ContainsAny(password, SpecialCharacters);

    int characterTypes = (hasUppercase ? 1 : 0) + (hasLowercase ? 1 : 0) + (hasDigits ? 1 : 0) + (hasSpecial ? 1 : 0);

    if (characterTypes >= 3)
        score++; // Increment score if password contains characters from at least 3 different character types

    return Mathf.Clamp(score, 1, 5); // Ensure score is within the range [1, 5]
}



    private bool ContainsAny(string input, string characters)
    {
        foreach (char c in input)
        {
            if (characters.Contains(c))
                return true;
        }
        return false;
    }

private void UpdateStatus(int strength)
{
    string status;
    Color color;

    switch (strength)
    {
        case 1:
            status = "Weak";
            color = Color.red;
            break;
        case 2:
            status = "Medium";
            color = new Color(1.0f, 0.5f, 0.0f); // Orange
            break;
        case 3:
            status = "Strong";
            color = Color.yellow;
            break;
        case 4:
            status = "Very Strong";
            color = new Color(0.5f, 1.0f, 0.0f); // Yellowish Green
            break;
        case 5:
            status = "Ultra Strong";
            color = Color.green;
            break;
        default:
            status = "Unknown";
            color = Color.white;
            break;
    }

    statusText.text = "Password Strength: " + status;
    statusText.color = color;
}


    private void EstimateTimeToCrack(string password)
    {
        // Assumptions for estimation
        int possibleCharacters = 72; // Uppercase, lowercase, digits, special characters
        double guessesPerSecond = 1000000000; // Adjust as needed based on attacker's resources

        // Calculate entropy
        double entropy = Mathf.Log(Mathf.Pow(possibleCharacters, password.Length), 2);

        // Calculate time to crack (in seconds) using brute force attack
        double timeToCrack = Mathf.Pow(2, (float)entropy) / guessesPerSecond;

        timeToCrackText.text = "Time to Crack: " + FormatTime(timeToCrack);
    }

private string FormatTime(double seconds)
{
    if (seconds < 60)
    {
        return seconds.ToString("F2") + " seconds";
    }
    else if (seconds < 3600)
    {
        return (seconds / 60).ToString("F2") + " minutes";
    }
    else if (seconds < 86400)
    {
        return (seconds / 3600).ToString("F2") + " hours";
    }
    else if (seconds < 604800)
    {
        return (seconds / 86400).ToString("F2") + " days";
    }
    else if (seconds < 2629743.83)
    {
        return (seconds / 604800).ToString("F2") + " weeks";
    }
    else if (seconds < 31556926)
    {
        return (seconds / 2629743.83).ToString("F2") + " months";
    }
    else
    {
        return (seconds / 31556926).ToString("F2") + " years";
    }
}


}
