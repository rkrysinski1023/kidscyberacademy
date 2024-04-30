/*************************
 ***developed this code***
 *************************/
using UnityEngine;
using TMPro;

public class targetCollHandler : MonoBehaviour
{
    public GameObject messagePanel; // Panel to display the message
    public TMP_Text messageText; // Text component to display the message
    public GameObject restartButton; // Button to restart the game

    private bool virusReached = false; // Flag to track if a virus has reached the computer

    void Start()
    {
        messagePanel.SetActive(false);
        restartButton.SetActive(false); 
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("enemy") && !virusReached)
        {
            Time.timeScale = 0f; // Pause the game

            // Display the message panel and set the message text
            messagePanel.SetActive(true);
            messageText.text = "<size=40>GAME OVER!</size>\nA virus breached your defenses!";
            messageText.color = new Color(1f, 0.2f, 0.2f); 
            virusReached = true; 

            // Show the restart button
            restartButton.SetActive(true);
        }
    }

    public void RestartGame()
    {
        Time.timeScale = 1f;

        // Reload the current scene to restart the game
        UnityEngine.SceneManagement.SceneManager.LoadScene(UnityEngine.SceneManagement.SceneManager.GetActiveScene().buildIndex);
    }
}
