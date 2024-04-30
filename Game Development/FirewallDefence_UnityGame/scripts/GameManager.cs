/*************************
 ***developed this code***
 *************************/
using UnityEngine;
using TMPro;

public class GameManager : MonoBehaviour
{
    public GameObject topEnemyPrefab; // Prefab of the enemy for the top path
    public GameObject bottomEnemyPrefab; // Prefab of the enemy for the bottom path
    public Transform topSpawnPoint; // Top spawn point for enemies
    public Transform bottomSpawnPoint; // Bottom spawn point for enemies
    public GameObject wallPrefab; // Prefab of the wall to be placed

    public float minSpawnInterval = 2f; // Minimum spawn interval (in seconds)
    public float maxSpawnInterval = 5f; // Maximum spawn interval (in seconds)
    public float minSpeed = 2f; // Minimum enemy movement speed
    public float maxSpeed = 5f; // Maximum enemy movement speed

    public int pointsNeededForWall = 10; // Points required to place a wall
    private int currentPoints = 0; // Current points accumulated by the player

    public TMP_Text pointsText; // Text component to display current points

    void Start()
    {
        StartEnemySpawning();
        UpdatePointsText();
    }

    void Update()
    {
        HandleWallPlacement();
        HandlePointGathering();
    }

    void StartEnemySpawning()
    {
        // Start spawning enemies with random intervals and paths
        Invoke("SpawnRandomEnemy", Random.Range(minSpawnInterval, maxSpawnInterval));
    }

    void SpawnRandomEnemy()
    {
        // Randomly choose between top or bottom path
        bool spawnOnTop = Random.value > 0.5f;

        GameObject enemyPrefab = spawnOnTop ? topEnemyPrefab : bottomEnemyPrefab;
        Transform spawnPoint = spawnOnTop ? topSpawnPoint : bottomSpawnPoint;

        // Instantiate enemy with random speed
        GameObject newEnemy = Instantiate(enemyPrefab, spawnPoint.position, Quaternion.identity);
        float randomSpeed = Random.Range(minSpeed, maxSpeed);
        newEnemy.GetComponent<EnemyMovement>().moveSpeed = randomSpeed;

        // Schedule next enemy spawn
        Invoke("SpawnRandomEnemy", Random.Range(minSpawnInterval, maxSpawnInterval));
    }

    void HandleWallPlacement()
    {
        // Check for mouse click (left button) to place a wall
        if (Input.GetMouseButtonDown(0) && currentPoints >= pointsNeededForWall)
        {
            Vector3 mousePosition = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            mousePosition.z = 0f; // Ensure z-axis is set to 0 for 2D placement

            // Instantiate a wall at the clicked position
            Instantiate(wallPrefab, mousePosition, Quaternion.identity);

            // Deduct points for placing a wall
            currentPoints -= pointsNeededForWall;
            UpdatePointsText();
        }
    }

    void HandlePointGathering()
    {
        // Check for spacebar press to add points
        if (Input.GetKeyDown(KeyCode.Space))
        {
            if(currentPoints<=9)
            {
            currentPoints++; // Increment points when spacebar is pressed with max of 10
            }
            UpdatePointsText();
        }
    }

    void UpdatePointsText()
    {
        // Update points text to display current points
        if (pointsText != null)
        {
            pointsText.text = "Wall Points: " + currentPoints.ToString();
        }
    }
}
