/*************************
 ***developed this code***
 *************************/

using UnityEngine;
using TMPro;
using System.Collections;

public class PlayerController : MonoBehaviour
{
    public float speed = 5f;
    public TextMeshProUGUI messageText;
    public GameObject messageBackground;
    public GameObject restartButton; // Reference to the restart button

    private Vector2 startPosition;
    private bool isGameOver = false;
    private bool isMessageDisplayed = false; // Flag to track if a message is currently displayed

    // Define horizontal and vertical constraints for player movement
    private float screenHalfWidth;
    private float screenHalfHeight;

    void Start()
    {
        startPosition = transform.position;

        // Calculate screen boundaries based on camera's size
        screenHalfHeight = Camera.main.orthographicSize;
        screenHalfWidth = screenHalfHeight * Screen.width / Screen.height;

        messageBackground.SetActive(false);
        restartButton.SetActive(false); // Hide the restart button
    }

    void Update()
    {
        if (!isGameOver && !isMessageDisplayed)
        {
            // Handle player movement only when not game over and no message displayed
            float moveHorizontal = Input.GetAxis("Horizontal");
            float moveVertical = Input.GetAxis("Vertical");

            // Calculate the desired movement
            Vector3 movement = new Vector3(moveHorizontal, moveVertical, 0f);
            Vector3 newPosition = transform.position + movement * speed * Time.deltaTime;

            // Clamp the player's new position within the screen boundaries
            newPosition.x = Mathf.Clamp(newPosition.x, -screenHalfWidth, screenHalfWidth);
            newPosition.y = Mathf.Clamp(newPosition.y, -screenHalfHeight, screenHalfHeight);

            // Update the player's position
            transform.position = newPosition;
        }
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Enemy") && isGameOver == false)
        {
            // Player collided with an enemy (middleman)
            Debug.Log("Message Intercepted");
            DisplayMessage("Message Intercepted", Color.red);
            ResetPlayer();
        }
        else if (other.CompareTag("Receiver"))
        {
            // Player reached the receiver
            Debug.Log("Good job, receiver got the message");
            DisplayMessage("Good job, receiver got the message", Color.green);
            messageBackground.SetActive(true);
            isGameOver = true;
            restartButton.SetActive(true); // Show the restart button
        }
    }

    void ResetPlayer()
    {
        // Reset player position to the start position
        transform.position = startPosition;

        // Freeze player movement and display message
        isMessageDisplayed = true;
        messageBackground.SetActive(true);
        isGameOver = true;

        // Start coroutine to clear the message after a delay
        StartCoroutine(ClearMessageAfterDelay(2f)); // Clear message after 2 seconds
    }

    void DisplayMessage(string message, Color color)
    {
        // Set message text and color
        messageText.text = $"<b>{message}</b>";  // Wrap message with <b> tag for bold effect
        messageText.color = color;
    }

    IEnumerator ClearMessageAfterDelay(float delay)
    {
        // Wait for the specified delay
        yield return new WaitForSeconds(delay);

        // Clear message and unfreeze player
        messageText.text = "";
        messageBackground.SetActive(false);
        isMessageDisplayed = false;
        isGameOver = false;
    }

    public void RestartGame()
    {
        // Reset game state
        isGameOver = false;
        isMessageDisplayed = false;
        messageText.text = "";
        messageBackground.SetActive(false);
        restartButton.SetActive(false); // Hide the restart button

        // Reset player position
        transform.position = startPosition;
    }
}
