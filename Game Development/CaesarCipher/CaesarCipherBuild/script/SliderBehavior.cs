/*************************
 ***developed this code***
 *************************/

using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System.Collections;

public class SliderBehavior : MonoBehaviour
{
    public Slider letterSlider;
    public Slider keySlider;
    public TextMeshProUGUI selectedLetterText;
    public TextMeshProUGUI selectedKeyText;
    public TextMeshProUGUI encodingText;
    public Transform innerWheel;
    public Transform outerWheel;
    public AudioSource clickSound;

    //initial rotation angles
    public float initialInnerWheelRotation = 0f;
    public float initialOuterWheelRotation = 0f;

    private float prevLetterSliderValue;
    private float prevKeySliderValue;

    private void Start()
    {
        // Set the initial rotation of the inner wheel
        innerWheel.rotation = Quaternion.Euler(0f, 0f, initialInnerWheelRotation);

        // Set the initial rotation of the outer wheel
        outerWheel.rotation = Quaternion.Euler(0f, 0f, initialOuterWheelRotation);

        prevLetterSliderValue = letterSlider.value;
        prevKeySliderValue = keySlider.value;
    }

    private void Update()
    {
        //Check if left mouse is held down
        if (Input.GetMouseButton(0))
        {
            // Raycast to determine if the mouse is over the sliders
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;

            if (Physics.Raycast(ray, out hit))
            {
                if (hit.collider.gameObject == letterSlider.gameObject)
                {
                    float normalizedMousePosX = Mathf.Clamp01((hit.point.x - letterSlider.transform.position.x) / letterSlider.GetComponent<RectTransform>().rect.width);
                    //update letter slider based on mouse pos
                    letterSlider.value = normalizedMousePosX * letterSlider.maxValue;
                }
                else if (hit.collider.gameObject == keySlider.gameObject)
                {
                    float normalizedMousePosX = Mathf.Clamp01((hit.point.x - keySlider.transform.position.x) / keySlider.GetComponent<RectTransform>().rect.width);
                    //update key slider based on mouse pos
                    keySlider.value = normalizedMousePosX * keySlider.maxValue;
                }
            }
        }

        // Update the UI Text components
        selectedLetterText.text = $"Selected Letter: {GetSelectedLetter()}";
        selectedKeyText.text = $"Selected Key: {GetSelectedKey()}";

        // Rotate both wheels based on letter
        RotateWheels(-GetSelectedLetterIndex(), GetSelectedKey());

        // Check if the sliders are moving and play sound
        if (Mathf.Abs(letterSlider.value - prevLetterSliderValue) > 0.01f || Mathf.Abs(keySlider.value - prevKeySliderValue) > 0.01f)
        {
            PlayClickSound();
        }

        // Update the previous values
        prevLetterSliderValue = letterSlider.value;
        prevKeySliderValue = keySlider.value;

        // Update the encoded letter text
        UpdateEncodingText();
    }

    //get the players selected letter
    private char GetSelectedLetter()
    {
        int letterIndex = Mathf.RoundToInt(letterSlider.value) % 26;
        char selectedLetter = (char)('A' + letterIndex);
        return selectedLetter;
    }

    //get the players selected key
    private int GetSelectedKey()
    {
        return Mathf.RoundToInt(keySlider.value);
    }

    //Wheel rotation implementation
    private void RotateWheels(int letterIndex, int key)
    {
        float angle = letterIndex * (360f / 26);

        innerWheel.rotation = Quaternion.Euler(0f, 0f, initialInnerWheelRotation - angle);
        outerWheel.rotation = Quaternion.Euler(0f, 0f, initialOuterWheelRotation - angle + key * (360f / 26));
    }

    //set selected letter index, 26 for the alphabet
    private int GetSelectedLetterIndex()
    {
        return Mathf.RoundToInt(letterSlider.value) % 26;
    }

    //Play audio clip
    private void PlayClickSound()
    {
        if (clickSound && clickSound.clip)
        {
            clickSound.Play();
        }
    }

    //Update displayed encoded letter
    private void UpdateEncodingText()
    {
        // Update the encoding information text
        char selectedLetter = GetSelectedLetter();
        int selectedKey = GetSelectedKey();

        char encodedLetter = EncodeLetter(selectedLetter, selectedKey);

        encodingText.text = $"Your letter encoded is {encodedLetter}!";
    }

    //Encoded Letter Implementation
    private char EncodeLetter(char letter, int key)
    {
        int encodedIndex = (letter - 'A' + key) % 26;
        char encodedLetter = (char)('A' + encodedIndex);
        return encodedLetter;
    }
}
