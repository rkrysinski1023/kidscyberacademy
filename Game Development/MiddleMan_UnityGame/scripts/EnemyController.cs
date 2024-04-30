/*************************
 ***developed this code***
 *************************/

using UnityEngine;

public class EnemyController : MonoBehaviour
{
    public float minSpeed = 3f;
    public float maxSpeed = 5f;
    public float speedChangeInterval = 3f; // Time interval for changing speed
    public float amplitude = 1f; // Amplitude of oscillation

    private float currentSpeed;
    private float timer;
    private float verticalRange;

    void Start()
    {
        // Initialize the enemy with a random starting speed within its specified range
        currentSpeed = Random.Range(minSpeed, maxSpeed);
        timer = speedChangeInterval; // Start timer for first speed change

        // Calculate vertical range based on camera's orthographic size
        Camera mainCamera = Camera.main;
        if (mainCamera != null)
        {
            float screenHalfHeight = mainCamera.orthographicSize;
            verticalRange = screenHalfHeight - transform.localScale.y / 2f; // Adjusted by enemy's size
        }
        else
        {
            Debug.LogWarning("Main camera not found. Vertical range calculation may be inaccurate.");
            verticalRange = 4f; // Default vertical range as fallback
        }
    }

    void Update()
    {
        // Move the enemy up and down based on the current speed and amplitude
        float movementOffset = Mathf.Sin(Time.time * currentSpeed) * amplitude;
        float newYPosition = transform.position.y + movementOffset * Time.deltaTime;

        // Clamp the new y-position within the calculated vertical range
        float clampedYPosition = Mathf.Clamp(newYPosition, -verticalRange, verticalRange);

        // Update the enemy's position
        transform.position = new Vector3(transform.position.x, clampedYPosition, transform.position.z);

        // Update speed periodically
        timer -= Time.deltaTime;
        if (timer <= 0f)
        {
            // Change speed to a new random value within the specified range
            currentSpeed = Random.Range(minSpeed, maxSpeed);
            timer = speedChangeInterval; // Reset the timer for the next speed change
        }
    }
}
