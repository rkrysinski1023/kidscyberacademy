/*************************
 ***developed this code***
 *************************/
using UnityEngine;
using TMPro;

public class WallController : MonoBehaviour
{
    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("enemy"))
        {
            Destroy(other.gameObject); // Destroy the enemy upon collision with the wall
            Destroy(gameObject); // Destroy the wall upon collision with an enemy
            VirusesStoppedManager.IncrementVirusesStoppedCount();
        }
    }

}
