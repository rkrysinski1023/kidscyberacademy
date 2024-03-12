using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System.Collections.Generic;
using UnityEngine.SceneManagement;

public class EmailManager : MonoBehaviour
{
    public TextMeshProUGUI tmp;
    public GameObject nextButton;
    public GameObject[] highlights;
    public TextMeshProUGUI hoverText;
    // public TextMeshProUGUI feedbackText; // Add this field
    public GameObject goodJobText; // Add this field
    public GameObject notQuiteText; // Add this field

    [System.Serializable]
    public class HighlightMessage
    {
        public string key;
        public string message;
    }

    public List<HighlightMessage> highlightMessages = new List<HighlightMessage>();
    private Dictionary<string, string> highlightMessagesDict = new Dictionary<string, string>();

    private int score = 0;
    private bool hasAnswered = false;

    private void Start()
    {
        // Add highlight messages to the dictionary
        foreach (var highlightMessage in highlightMessages)
        {
            if (!string.IsNullOrEmpty(highlightMessage.key) && !string.IsNullOrEmpty(highlightMessage.message))
            {
                highlightMessagesDict.Add(highlightMessage.key, highlightMessage.message);
            }
        }

        // Retrieve the score from PlayerPrefs
        score = PlayerPrefs.GetInt("Score", 0);

        // Update the score UI
        UpdateScoreUI();
    }

    public void OnXButtonClick()
    {
        if (!hasAnswered)
        {
            if (!IsSafeScene())
            {
                IncrementScore();
                goodJobText.gameObject.SetActive(true); // Show "Good Job!!" text
                notQuiteText.gameObject.SetActive(false); // Hide "Not Quite!!" text
            }
            else
            {
                notQuiteText.gameObject.SetActive(true); // Show "Not Quite!!" text
                goodJobText.gameObject.SetActive(false); // Hide "Good Job!!" text
            }
            ShowHighlights();
            ShowNextButton();
            hasAnswered = true;
        }
    }

    public void OnCheckmarkButtonClick()
    {
        if (!hasAnswered)
        {
            if (IsSafeScene())
            {
                IncrementScore();
                goodJobText.gameObject.SetActive(true); // Show "Good Job!!" text
                notQuiteText.gameObject.SetActive(false); // Hide "Not Quite!!" text
            }
            else
            {
                notQuiteText.gameObject.SetActive(true); // Show "Not Quite!!" text
                goodJobText.gameObject.SetActive(false); // Hide "Good Job!!" text
            }
            ShowHighlights();
            ShowNextButton();
            hasAnswered = true;
        }
    }

    public void OnNextButtonClick()
    {
        // Save the score before loading the next scene
        
        PlayerPrefs.SetInt("Score", score);
        PlayerPrefs.Save();

        // Load the next scene
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
    }

    public void OnBackToBeginningButtonClick()
{
    // Reset the score to zero
    score = 0;
    
    // Update the score UI
    UpdateScoreUI();
    
    // Save the score
    PlayerPrefs.SetInt("Score", score);
    PlayerPrefs.Save();
    
    // Load the first scene
    SceneManager.LoadScene(0);
}

    public void OnPointerEnterHighlight(string highlightKey)
    {
        Debug.Log("Mouse entered highlight with key: " + highlightKey);

        // Check if the highlight key exists in the dictionary
        if (highlightMessagesDict.ContainsKey(highlightKey))
        {
            hoverText.text = highlightMessagesDict[highlightKey];
        }
    }

    public void OnPointerExitHighlight()
    {
        hoverText.text = "";
    }

    private void IncrementScore()
    {
        score++;
        UpdateScoreUI();
    }

private void UpdateScoreUI()
{
    if (IsFinalScene())
    {
        tmp.text = "Score: " + score.ToString() + "/5";
    }
    else
    {
        tmp.text = "Score: " + score.ToString();
    }
}

    private void ShowNextButton()
    {
        nextButton.SetActive(true);
    }

    private void ShowHighlights()
    {
        foreach (GameObject highlight in highlights)
        {
            highlight.SetActive(true);
        }
    }

    private bool IsSafeScene()
    {
        // Check the current scene name
        string sceneName = SceneManager.GetActiveScene().name;
        
        // Add conditions for safe scenes
        if (sceneName == "safeEmail1" || sceneName == "safeEmail2")
        {
            return true;
        }
        return false;
    }
    private bool IsFinalScene()
{
    int finalSceneIndex = SceneManager.sceneCountInBuildSettings - 1;
    return SceneManager.GetActiveScene().buildIndex == finalSceneIndex;
}
}
