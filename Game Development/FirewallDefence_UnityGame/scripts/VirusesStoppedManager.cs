/*************************
 ***developed this code***
 *************************/
using UnityEngine;
using TMPro;

public class VirusesStoppedManager : MonoBehaviour
{
    private static VirusesStoppedManager instance;
    private int virusesStoppedCount = 0;
    public TMP_Text virusesStoppedText;

    private void Awake()
    {
        // *****Singleton pattern*****
        if (instance == null)
        {
            instance = this;
        }
        else
        {
            Destroy(gameObject);
        }

        // Update the viruses stopped text initially
        UpdateVirusesStoppedText();
    }

    public static void IncrementVirusesStoppedCount()
    {
        instance.virusesStoppedCount++;
        instance.UpdateVirusesStoppedText();
    }

    private void UpdateVirusesStoppedText()
    {
        if (virusesStoppedText != null)
        {
            virusesStoppedText.text = "<u>Virus Stops</u>\n" + virusesStoppedCount.ToString();
        }
    }
}
