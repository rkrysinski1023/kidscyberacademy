import unittest
from selenium import webdriver

class QuizWidgetTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

    def tearDown(self):
        self.driver.close()

    def test_submit_quiz(self):
        self.driver.get("file:///path/to/your/quiz.html")
        radio_button = self.driver.find_element_by_css_selector('input[name="q1"][value="a"]')
        radio_button.click()
        submit_button = self.driver.find_element_by_tag_name('button')
        submit_button.click()
        alert = self.driver.switch_to.alert
        self.assertEqual(alert.text, 'Correct Answers: 1\nIncorrect Answers: 0')
        alert.accept()

if __name__ == "__main__":
    unittest.main()
    print("All checks passed")
