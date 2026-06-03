const{expect}=require('@playwright/test');
const signUpInputs = require('../dataInputs/signUpInputs');

class SignupORLoginPage {
    constructor(page) {
        this.page = page;
        //Click Signup / Login button
        this.signupOrLoginButton = page.getByRole('link', { name: ' Signup / Login' });
        
        //Login to your Account Text
        this.loginToYourAccountText =  page.getByRole('heading', { name: 'Login to your account' });
        //Login to your Account Fields
        this.emailAddressField_Login = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.passwordField_Login = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });


        //New User Signup Text
        this.newUserSignupText = page.getByRole('heading', { name: 'New User Signup!' });
        //New User Signup Fields
        this.nameField_Signup = page.getByPlaceholder('Name');
        this.emailAddressField_Signup =  page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signupButton = page.getByRole('button', { name: 'Signup' });
        
        //URL for Signup / Login page
        this.signupORLoginPageUrl = process.env.homeURL + '/login';

        //========================================//
        //   Enter Account Information SECTION    //
        //========================================//
        //Verify header 'Enter Account Information'
        this.header_EnterAccountInformation = page.getByRole('heading', { name: 'Enter Account Information' });

        //Title Section
        this.title_Text = page.getByText('Title');
        //Radion Buttons for Title
        this.mr = page.getByText('Mr.');
        this.mrs = page.getByText('Mrs.');

        //Name Section
        this.name_text = page.getByText('Name *', { exact: true });
        this.name_field = page.getByRole('textbox', { name: 'Name *', exact: true });
        
        //Password Field
        this.password_text = page.getByText('Password *');
        this.passwordField_Signup = page.getByRole('textbox', { name: 'Password *' });

        //Date of Birth Section
        this.dateOfBirth_text = page.getByText('Date of Birth');
        this.days_dropdown = page.locator('#days');
        this.months_dropdown = page.locator('#months');
        this.years_dropdown = page.locator('#years');

        // Signup for our newsletter Section
        this.signupForNewsletter_checkbox = page.getByRole('checkbox', { name: 'Sign up for our newsletter!' })

        // Receive special offers from our partners! Section
        this.receiveSpecialOffers_checkbox =  page.getByRole('checkbox', { name: 'Receive special offers from' });


        //========================================//
        //       Address Information SECTION      //
        //========================================//

        //First Name Section
        this.firstName_text = page.getByText('First name *', { exact: true });
        this.firstName_Field = page.getByRole('textbox', { name: 'First name *'});
       
        //Last Name Section
        this.lastName_text = page.getByText('Last name *', { exact: true });
        this.lastName_Field = page.getByRole('textbox', { name: 'Last name *' });

        //Company Section
        this.company_text = page.getByText('Company', { exact: true });
        this.company_Field = page.getByRole('textbox', { name: 'Company', exact: true });

        //Address Section
        this.address_text = page.getByText('Address * (Street address, P.');
        this.address_Field = page.getByRole('textbox', { name: 'Address * (Street address, P.' });

        //Address2 Section
        this.address2_text = page.getByText('Address 2');
        this.address2_Field = page.getByRole('textbox', { name: 'Address 2' });

        //Country SectionDropdown
        this.country_text = page.getByText('Country *');
        this.country_dropdown = page.getByLabel('Country *');

        //State Section
        this.state_text = page.getByText('State *');
        this.state_Field = page.getByRole('textbox', { name: 'State *' });

        //City Section
        this.city_text = page.getByText('City *');
        this.city_Field = page.getByRole('textbox', { name: 'City *' });

        //Zipcode Section
        this.zipcode_text = page.getByText('Zipcode *');
        this.zipcode_Field = page.locator('#zipcode');

        //Mobile Number Section
        this.mobileNumber_text = page.getByText('Mobile Number *');
        this.mobileNumber_Field = page.getByRole('textbox', { name: 'Mobile Number *' });
        

    }
    async clickSignupOrLoginButton() {
        await this.signupOrLoginButton.click();
    }
    async verifynewUserSignupText() {
        await expect(this.newUserSignupText).toBeVisible();
    }
    async verifyLoginURL() {
        await expect(this.page).toHaveURL(this.signupORLoginPageUrl);
    }
    
    async newUserSignUp_Process() {
   
        await this.nameField_Signup.fill(signUpInputs.name);
        await this.emailAddressField_Signup.fill(signUpInputs.emailfill);
        await this.signupButton.click();
    }

  //Enter Account Information SECTION//
     async verifyEnterAccountInformationHeader() {
        await expect(this.header_EnterAccountInformation).toBeVisible();
    }
    async verifyOtherSectionTexts() {
        await expect(this.title_Text).toBeVisible();
        await expect(this.name_text).toBeVisible();
        await expect(this.password_text).toBeVisible();
        await expect(this.dateOfBirth_text).toBeVisible();
    }
    async enterAccountInfo_Process() {
        await this.mr.check();
        await this.name_field.fill(signUpInputs.nameUpdate);
        await this.passwordField_Signup.fill(signUpInputs.password);
        await this.days_dropdown.selectOption(signUpInputs.day);
        await this.months_dropdown.selectOption(signUpInputs.month);
        await this.years_dropdown.selectOption(signUpInputs.year);
        await this.signupForNewsletter_checkbox.check();
        await this.receiveSpecialOffers_checkbox.check();
    }

    //Address Information SECTION//
    async verifyAddressInformationSection() {
        
        await expect(this.firstName_text).toBeVisible();
        await expect(this.lastName_text).toBeVisible();
        await expect(this.company_text).toBeVisible();
        await expect(this.address_text).toBeVisible();
        await expect(this.address2_text).toBeVisible();
        await expect(this.country_text).toBeVisible();
        await expect(this.state_text).toBeVisible();
        await expect(this.city_text).toBeVisible();
        await expect(this.zipcode_text).toBeVisible();
        await expect(this.mobileNumber_text).toBeVisible();
    }
    async enterAddressInformation() {
        await this.firstName_Field.click();
        await this.firstName_Field.fill(signUpInputs.first_name);
        await this.lastName_Field.fill(signUpInputs.last_name);
        await this.company_Field.fill(signUpInputs.company);
        await this.address_Field.fill(signUpInputs.address_1);
        await this.address2_Field.fill(signUpInputs.address_2);
        await this.country_dropdown.selectOption(signUpInputs.country);
        await this.state_Field.fill(signUpInputs.state);
        await this.city_Field.fill(signUpInputs.city);
        await this.zipcode_Field.fill(signUpInputs.zipcode);
        await this.mobileNumber_Field.fill(signUpInputs.mobile_number);
 
    }

}
module.exports = {SignupORLoginPage};