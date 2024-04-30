/*************************
 ***developed this code***
 *************************/
using UnityEngine;

public class EnemyMovement : MonoBehaviour
{
    private Transform[] waypoints; // Array of waypoints defining the custom path
    public float moveSpeed = 3f; // Movement speed of enemies
    private int currentWaypointIndex = 0;

    void Start()
    {
        // Initialize waypoints based on the spawn location of the enemy
        if (transform.position.y > 0) // Enemy spawned on top
        {
            InitializeWaypoints("topWP");
        }
        else // Enemy spawned on bottom
        {
            InitializeWaypoints("bottomWP");
        }
    }

    void Update()
    {
        if (waypoints != null && currentWaypointIndex < waypoints.Length)
        {
            MoveTowardsWaypoint();
        }
    }

    void InitializeWaypoints(string waypointPrefix)
    {
        // Find all waypoints with the specified prefix
        GameObject[] waypointObjects = GameObject.FindGameObjectsWithTag(waypointPrefix);

        // Sort waypoints based on their index in the scene
        System.Array.Sort(waypointObjects, (x, y) => x.name.CompareTo(y.name));

        // Assign waypoints to the array
        waypoints = new Transform[waypointObjects.Length];
        for (int i = 0; i < waypointObjects.Length; i++)
        {
            waypoints[i] = waypointObjects[i].transform;
        }
    }

    void MoveTowardsWaypoint()
    {
        Transform currentWaypoint = waypoints[currentWaypointIndex];
        Vector3 targetPosition = currentWaypoint.position;
        Vector3 moveDirection = (targetPosition - transform.position).normalized;

        transform.Translate(moveDirection * moveSpeed * Time.deltaTime);

        // Check if enemy reached the current waypoint
        if (Vector3.Distance(transform.position, targetPosition) < 0.1f)
        {
            // Move to the next waypoint in the sequence
            currentWaypointIndex = (currentWaypointIndex + 1) % waypoints.Length;
        }
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.CompareTag("wall"))
        {
            // Destroy the enemy GameObject upon collision with a wall
            Destroy(gameObject);
        }
    }
}
