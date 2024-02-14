import { ORDER_ITEM, SHIPPING } from '../interfaces/types';

export const emailVerification = (name: string, code: string) => {
	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@900&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
    <title>Storefront</title>
  </head>
  <body>
    <div
      class="headerContainer"
      style="
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 2.5rem;
      "
    >
      <div
        class="header"
        style="
          color: var(--Primary, #0085ff);
          text-align: center;
          font-family: 'Poppins';
          font-size: 1.5rem;
          font-style: normal;
          font-weight: 900;
          line-height: normal;
        "
      >
        Storefront
      </div>
      
      
 <p
        class="reset"
        style="
          color: var(--colors-primary-slate-900, #1c222b);
          text-align: center;
          font-family: Inter;
          font-size: 1.5rem;
          font-style: normal;
          font-weight: 700;
          line-height: 2.25rem;
          letter-spacing: -0.03125rem;
        "
      >
        Hello ${name}, </br> 
       Your Storefront account has been created!
      </p>
    </div>

    <div
      class="body"
      style="
        color: var(--colors-primary-slate-700, #3d4a5c);
        text-align: center;
        font-family: 'Inter';
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.75rem;
        letter-spacing: -0.01875rem;
        max-width: 32rem;
        align-items: center;
        margin: auto;
      "
    >
      <br />
    Thank you for signing up for a Storefront account! To start using your account, you need to verify your email address.
        </br> 
          <br />
        To verify your email address, please enter the following verification code into your account:
         
      <h3 style="
        color: var(--colors-primary-slate-700, #3d4a5c);
        text-align: center;
        font-family: 'Inter';
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.75rem;
        letter-spacing: -0.01875rem;      
      ">${code}</h3>
      <br />
        Once you have verified your email address, you will be able to log in to your account and start using all of our features.
  <br />  <br />
If you have any problems verifying your email address, please contact us at support@amalitech.org.
      <br />
      <br />
    </div>




     <hr
      class="line"
      style="
        margin-top: 3.5rem;
        width: 7.8125rem;
        height: 0.0625rem;
        background: rgba(0, 0, 0, 0.24);
        margin-left: auto;
        margin-right: auto;
      "
    />

    <div
      class="icons"
      style="
        margin-top: 4rem;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <g clip-path="url(#clip0_2398_29790)">
          <path
            d="M22.1623 5.65593C21.3989 5.99362 20.5893 6.2154 19.7603 6.31393C20.634 5.79136 21.288 4.96894 21.6003 3.99993C20.7803 4.48793 19.8813 4.82993 18.9443 5.01493C18.3149 4.34151 17.4807 3.89489 16.5713 3.74451C15.6618 3.59413 14.7282 3.74842 13.9156 4.18338C13.1029 4.61834 12.4567 5.30961 12.0774 6.14972C11.6981 6.98983 11.607 7.93171 11.8183 8.82893C10.1554 8.74558 8.52863 8.31345 7.04358 7.56059C5.55854 6.80773 4.24842 5.75097 3.1983 4.45893C2.82659 5.09738 2.63125 5.82315 2.6323 6.56193C2.6323 8.01193 3.3703 9.29293 4.4923 10.0429C3.82831 10.022 3.17893 9.84271 2.5983 9.51993V9.57193C2.5985 10.5376 2.93267 11.4735 3.54414 12.221C4.15562 12.9684 5.00678 13.4814 5.9533 13.6729C5.33691 13.84 4.6906 13.8646 4.0633 13.7449C4.33016 14.5762 4.8503 15.3031 5.55089 15.824C6.25147 16.3449 7.09742 16.6337 7.9703 16.6499C7.10278 17.3313 6.10947 17.8349 5.04718 18.1321C3.98488 18.4293 2.87442 18.5142 1.7793 18.3819C3.69099 19.6114 5.91639 20.264 8.1893 20.2619C15.8823 20.2619 20.0893 13.8889 20.0893 8.36193C20.0893 8.18193 20.0843 7.99993 20.0763 7.82193C20.8952 7.23009 21.6019 6.49695 22.1633 5.65693L22.1623 5.65593Z"
            fill="#5E718D"
          />
        </g>
        <defs>
          <clipPath id="clip0_2398_29790">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <g clip-path="url(#clip0_2398_29746)">
          <path
            d="M15.402 21V14.034H17.735L18.084 11.326H15.402V9.598C15.402 8.814 15.62 8.279 16.744 8.279H18.178V5.857C17.4838 5.78334 16.7861 5.74762 16.088 5.75C14.021 5.75 12.606 7.012 12.606 9.33V11.326H10.268V14.034H12.606V21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H15.402Z"
            fill="#5E718D"
          />
        </g>
        <defs>
          <clipPath id="clip0_2398_29746">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <g clip-path="url(#clip0_2398_29749)">
          <path
            d="M18.335 18.339H15.67V14.162C15.67 13.166 15.65 11.884 14.28 11.884C12.891 11.884 12.679 12.968 12.679 14.089V18.339H10.013V9.75H12.573V10.92H12.608C12.966 10.246 13.836 9.533 15.136 9.533C17.836 9.533 18.336 11.311 18.336 13.624V18.339H18.335ZM7.003 8.575C6.79956 8.57526 6.59806 8.53537 6.41006 8.45761C6.22207 8.37984 6.05127 8.26574 5.90746 8.12184C5.76365 7.97793 5.64965 7.80706 5.57201 7.61901C5.49437 7.43097 5.4546 7.22944 5.455 7.026C5.4552 6.71983 5.54618 6.4206 5.71644 6.16615C5.8867 5.91169 6.12859 5.71343 6.41153 5.59645C6.69447 5.47947 7.00574 5.44902 7.30598 5.50894C7.60622 5.56886 7.88196 5.71648 8.09831 5.93311C8.31466 6.14974 8.46191 6.42566 8.52145 6.72598C8.58099 7.0263 8.55013 7.33753 8.43278 7.62032C8.31543 7.9031 8.11687 8.14474 7.86219 8.31467C7.60751 8.4846 7.30817 8.5752 7.002 8.575H7.003ZM8.339 18.339H5.666V9.75H8.34V18.339H8.339ZM19.67 3H4.329C3.593 3 3 3.58 3 4.297V19.703C3 20.42 3.594 21 4.328 21H19.666C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3H19.669H19.67Z"
            fill="#5E718D"
          />
        </g>
        <defs>
          <clipPath id="clip0_2398_29749">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
<div
      class="footer"
      style="
        margin-top: 1rem;
        align-self: stretch;
        color: var(--colors-primary-slate-500, #5e718d);
        text-align: center;
        font-family: Inter;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.25rem;
        letter-spacing: -0.0125rem;
      "
    >
      Copyright © 2023
      <br />
      Storefront Rewards & Recognition.
      <br />
      A better company begins with a personalized employee experience.
    </div>
  </body>
</html> 
      `;
};
export const emailVerified = (name: string) => {
	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@900&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
    <title>Storefront</title>
  </head>
  <body>
    <div
      class="headerContainer"
      style="
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 2.5rem;
      "
    >
      <div
        class="header"
        style="
          color: var(--Primary, #0085ff);
          text-align: center;
          font-family: 'Poppins';
          font-size: 1.5rem;
          font-style: normal;
          font-weight: 900;
          line-height: normal;
        "
      >
        Storefront
      </div>
      
      
 <p
        class="reset"
        style="
          color: var(--colors-primary-slate-900, #1c222b);
          text-align: center;
          font-family: Inter;
          font-size: 1.5rem;
          font-style: normal;
          font-weight: 700;
          line-height: 2.25rem;
          letter-spacing: -0.03125rem;
        "
      >
        Hello ${name}, </br> 
       Your Storefront account has been verified!
      </p>
    </div>

    <div
      class="body"
      style="
        color: var(--colors-primary-slate-700, #3d4a5c);
        text-align: center;
        font-family: 'Inter';
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.75rem;
        letter-spacing: -0.01875rem;
        max-width: 32rem;
        align-items: center;
        margin: auto;
      "
    >
       Your StoreFront account has been verified! You can now log in to your account and start using all of our features.
  <br />

      <br />
    </div>


     <hr
      class="line"
      style="
        margin-top: 3.5rem;
        width: 7.8125rem;
        height: 0.0625rem;
        background: rgba(0, 0, 0, 0.24);
        margin-left: auto;
        margin-right: auto;
      "
    />

    <div
      class="icons"
      style="
        margin-top: 4rem;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <g clip-path="url(#clip0_2398_29790)">
          <path
            d="M22.1623 5.65593C21.3989 5.99362 20.5893 6.2154 19.7603 6.31393C20.634 5.79136 21.288 4.96894 21.6003 3.99993C20.7803 4.48793 19.8813 4.82993 18.9443 5.01493C18.3149 4.34151 17.4807 3.89489 16.5713 3.74451C15.6618 3.59413 14.7282 3.74842 13.9156 4.18338C13.1029 4.61834 12.4567 5.30961 12.0774 6.14972C11.6981 6.98983 11.607 7.93171 11.8183 8.82893C10.1554 8.74558 8.52863 8.31345 7.04358 7.56059C5.55854 6.80773 4.24842 5.75097 3.1983 4.45893C2.82659 5.09738 2.63125 5.82315 2.6323 6.56193C2.6323 8.01193 3.3703 9.29293 4.4923 10.0429C3.82831 10.022 3.17893 9.84271 2.5983 9.51993V9.57193C2.5985 10.5376 2.93267 11.4735 3.54414 12.221C4.15562 12.9684 5.00678 13.4814 5.9533 13.6729C5.33691 13.84 4.6906 13.8646 4.0633 13.7449C4.33016 14.5762 4.8503 15.3031 5.55089 15.824C6.25147 16.3449 7.09742 16.6337 7.9703 16.6499C7.10278 17.3313 6.10947 17.8349 5.04718 18.1321C3.98488 18.4293 2.87442 18.5142 1.7793 18.3819C3.69099 19.6114 5.91639 20.264 8.1893 20.2619C15.8823 20.2619 20.0893 13.8889 20.0893 8.36193C20.0893 8.18193 20.0843 7.99993 20.0763 7.82193C20.8952 7.23009 21.6019 6.49695 22.1633 5.65693L22.1623 5.65593Z"
            fill="#5E718D"
          />
        </g>
        <defs>
          <clipPath id="clip0_2398_29790">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <g clip-path="url(#clip0_2398_29746)">
          <path
            d="M15.402 21V14.034H17.735L18.084 11.326H15.402V9.598C15.402 8.814 15.62 8.279 16.744 8.279H18.178V5.857C17.4838 5.78334 16.7861 5.74762 16.088 5.75C14.021 5.75 12.606 7.012 12.606 9.33V11.326H10.268V14.034H12.606V21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H15.402Z"
            fill="#5E718D"
          />
        </g>
        <defs>
          <clipPath id="clip0_2398_29746">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <g clip-path="url(#clip0_2398_29749)">
          <path
            d="M18.335 18.339H15.67V14.162C15.67 13.166 15.65 11.884 14.28 11.884C12.891 11.884 12.679 12.968 12.679 14.089V18.339H10.013V9.75H12.573V10.92H12.608C12.966 10.246 13.836 9.533 15.136 9.533C17.836 9.533 18.336 11.311 18.336 13.624V18.339H18.335ZM7.003 8.575C6.79956 8.57526 6.59806 8.53537 6.41006 8.45761C6.22207 8.37984 6.05127 8.26574 5.90746 8.12184C5.76365 7.97793 5.64965 7.80706 5.57201 7.61901C5.49437 7.43097 5.4546 7.22944 5.455 7.026C5.4552 6.71983 5.54618 6.4206 5.71644 6.16615C5.8867 5.91169 6.12859 5.71343 6.41153 5.59645C6.69447 5.47947 7.00574 5.44902 7.30598 5.50894C7.60622 5.56886 7.88196 5.71648 8.09831 5.93311C8.31466 6.14974 8.46191 6.42566 8.52145 6.72598C8.58099 7.0263 8.55013 7.33753 8.43278 7.62032C8.31543 7.9031 8.11687 8.14474 7.86219 8.31467C7.60751 8.4846 7.30817 8.5752 7.002 8.575H7.003ZM8.339 18.339H5.666V9.75H8.34V18.339H8.339ZM19.67 3H4.329C3.593 3 3 3.58 3 4.297V19.703C3 20.42 3.594 21 4.328 21H19.666C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3H19.669H19.67Z"
            fill="#5E718D"
          />
        </g>
        <defs>
          <clipPath id="clip0_2398_29749">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
<div
      class="footer"
      style="
        margin-top: 1rem;
        align-self: stretch;
        color: var(--colors-primary-slate-500, #5e718d);
        text-align: center;
        font-family: Inter;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.25rem;
        letter-spacing: -0.0125rem;
      "
    >
      Copyright © 2023
      <br />
      Storefront Rewards & Recognition.
      <br />
      A better company begins with a personalized employee experience.
    </div>
  </body>
</html> 
      `;
};
export const resendCode = (name: string, code: string) => {
	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@900&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
    <title>Storefront</title>
  </head>
  <body>
    <div
      class="headerContainer"
      style="
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 2.5rem;
      "
    >
      <div
        class="header"
        style="
          color: var(--Primary, #0085ff);
          text-align: center;
          font-family: 'Poppins';
          font-size: 1.5rem;
          font-style: normal;
          font-weight: 900;
          line-height: normal;
        "
      >
        Storefront
      </div>
      
      
  <p
        class="reset"
        style="
          color: var(--colors-primary-slate-900, #1c222b);
          text-align: center;
          font-family: Inter;
          font-size: 1.5rem;
          font-style: normal;
          font-weight: 700;
          line-height: 2.25rem;
          letter-spacing: -0.03125rem;
        "
      >
        Hello ${name}, </br> 
       You have new Storefront verification code!
      </p>
    </div>

    <div
      class="body"
      style="
        color: var(--colors-primary-slate-700, #3d4a5c);
        text-align: center;
        font-family: 'Inter';
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.75rem;
        letter-spacing: -0.01875rem;
        max-width: 32rem;
        align-items: center;
        margin: auto;
      "
    >
      <br />
    You have requested for a new verification code, please enter the following code in the verification page:
        </br> 
         
      <h3 style="
        color: var(--colors-primary-slate-700, #3d4a5c);
        text-align: center;
        font-family: 'Inter';
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.75rem;
        letter-spacing: -0.01875rem;      
      ">${code}</h3>
      <br />
        This code will expire in 1 hour, so please be sure to verify your account as soon as possible.
  <br />  <br />
If you have any problems verifying your account, please contact us at support@amalitech.org.
      <br />
      <br />
    </div>


     <hr
      class="line"
      style="
        margin-top: 3.5rem;
        width: 7.8125rem;
        height: 0.0625rem;
        background: rgba(0, 0, 0, 0.24);
        margin-left: auto;
        margin-right: auto;
      "
    />

    <div
      class="icons"
      style="
        margin-top: 4rem;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <g clip-path="url(#clip0_2398_29790)">
          <path
            d="M22.1623 5.65593C21.3989 5.99362 20.5893 6.2154 19.7603 6.31393C20.634 5.79136 21.288 4.96894 21.6003 3.99993C20.7803 4.48793 19.8813 4.82993 18.9443 5.01493C18.3149 4.34151 17.4807 3.89489 16.5713 3.74451C15.6618 3.59413 14.7282 3.74842 13.9156 4.18338C13.1029 4.61834 12.4567 5.30961 12.0774 6.14972C11.6981 6.98983 11.607 7.93171 11.8183 8.82893C10.1554 8.74558 8.52863 8.31345 7.04358 7.56059C5.55854 6.80773 4.24842 5.75097 3.1983 4.45893C2.82659 5.09738 2.63125 5.82315 2.6323 6.56193C2.6323 8.01193 3.3703 9.29293 4.4923 10.0429C3.82831 10.022 3.17893 9.84271 2.5983 9.51993V9.57193C2.5985 10.5376 2.93267 11.4735 3.54414 12.221C4.15562 12.9684 5.00678 13.4814 5.9533 13.6729C5.33691 13.84 4.6906 13.8646 4.0633 13.7449C4.33016 14.5762 4.8503 15.3031 5.55089 15.824C6.25147 16.3449 7.09742 16.6337 7.9703 16.6499C7.10278 17.3313 6.10947 17.8349 5.04718 18.1321C3.98488 18.4293 2.87442 18.5142 1.7793 18.3819C3.69099 19.6114 5.91639 20.264 8.1893 20.2619C15.8823 20.2619 20.0893 13.8889 20.0893 8.36193C20.0893 8.18193 20.0843 7.99993 20.0763 7.82193C20.8952 7.23009 21.6019 6.49695 22.1633 5.65693L22.1623 5.65593Z"
            fill="#5E718D"
          />
        </g>
        <defs>
          <clipPath id="clip0_2398_29790">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <g clip-path="url(#clip0_2398_29746)">
          <path
            d="M15.402 21V14.034H17.735L18.084 11.326H15.402V9.598C15.402 8.814 15.62 8.279 16.744 8.279H18.178V5.857C17.4838 5.78334 16.7861 5.74762 16.088 5.75C14.021 5.75 12.606 7.012 12.606 9.33V11.326H10.268V14.034H12.606V21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H15.402Z"
            fill="#5E718D"
          />
        </g>
        <defs>
          <clipPath id="clip0_2398_29746">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <g clip-path="url(#clip0_2398_29749)">
          <path
            d="M18.335 18.339H15.67V14.162C15.67 13.166 15.65 11.884 14.28 11.884C12.891 11.884 12.679 12.968 12.679 14.089V18.339H10.013V9.75H12.573V10.92H12.608C12.966 10.246 13.836 9.533 15.136 9.533C17.836 9.533 18.336 11.311 18.336 13.624V18.339H18.335ZM7.003 8.575C6.79956 8.57526 6.59806 8.53537 6.41006 8.45761C6.22207 8.37984 6.05127 8.26574 5.90746 8.12184C5.76365 7.97793 5.64965 7.80706 5.57201 7.61901C5.49437 7.43097 5.4546 7.22944 5.455 7.026C5.4552 6.71983 5.54618 6.4206 5.71644 6.16615C5.8867 5.91169 6.12859 5.71343 6.41153 5.59645C6.69447 5.47947 7.00574 5.44902 7.30598 5.50894C7.60622 5.56886 7.88196 5.71648 8.09831 5.93311C8.31466 6.14974 8.46191 6.42566 8.52145 6.72598C8.58099 7.0263 8.55013 7.33753 8.43278 7.62032C8.31543 7.9031 8.11687 8.14474 7.86219 8.31467C7.60751 8.4846 7.30817 8.5752 7.002 8.575H7.003ZM8.339 18.339H5.666V9.75H8.34V18.339H8.339ZM19.67 3H4.329C3.593 3 3 3.58 3 4.297V19.703C3 20.42 3.594 21 4.328 21H19.666C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3H19.669H19.67Z"
            fill="#5E718D"
          />
        </g>
        <defs>
          <clipPath id="clip0_2398_29749">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
<div
      class="footer"
      style="
        margin-top: 1rem;
        align-self: stretch;
        color: var(--colors-primary-slate-500, #5e718d);
        text-align: center;
        font-family: Inter;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.25rem;
        letter-spacing: -0.0125rem;
      "
    >
      Copyright © 2023
      <br />
      Storefront Rewards & Recognition.
      <br />
      A better company begins with a personalized employee experience.
    </div>
  </body>
</html> 
      `;
};

export const resetPassword = (name: string, code: string) => {
	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@900&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
    <title>Storefront</title>
  </head>
  <body>
    <div
      class="headerContainer"
      style="
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 2.5rem;
      "
    >
      <div
        class="header"
        style="
          color: var(--Primary, #0085ff);
          text-align: center;
          font-family: 'Poppins';
          font-size: 1.5rem;
          font-style: normal;
          font-weight: 900;
          line-height: normal;
        "
      >
        Storefront
      </div>
      
      
 <p
        class="reset"
        style="
          color: var(--colors-primary-slate-900, #1c222b);
          text-align: center;
          font-family: Inter;
          font-size: 1.5rem;
          font-style: normal;
          font-weight: 700;
          line-height: 2.25rem;
          letter-spacing: -0.03125rem;
        "
      >
        Hello ${name}, </br> 
       Your Storefront account has been reset!
      </p>
    </div>

    <div
      class="body"
      style="
        color: var(--colors-primary-slate-700, #3d4a5c);
        text-align: center;
        font-family: 'Inter';
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.75rem;
        letter-spacing: -0.01875rem;
        max-width: 32rem;
        align-items: center;
        margin: auto;
      "
    >
      <br />
    You have requested a password reset for your StoreFront account. To reset your password, please enter the following code in the verification page:
        </br> 
         
      <h3 style="
        color: var(--colors-primary-slate-700, #3d4a5c);
        text-align: center;
        font-family: 'Inter';
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.75rem;
        letter-spacing: -0.01875rem;      
      ">${code}</h3>
      <br />
        This code will expire in 1 hour, so please be sure to reset your password as soon as possible.
  <br />  <br />
If you have any problems resetting your password, please contact us at support@amalitech.org.
      <br />
      <br />
    </div>


     <hr
      class="line"
      style="
        margin-top: 3.5rem;
        width: 7.8125rem;
        height: 0.0625rem;
        background: rgba(0, 0, 0, 0.24);
        margin-left: auto;
        margin-right: auto;
      "
    />

    <div
      class="icons"
      style="
        margin-top: 4rem;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <g clip-path="url(#clip0_2398_29790)">
          <path
            d="M22.1623 5.65593C21.3989 5.99362 20.5893 6.2154 19.7603 6.31393C20.634 5.79136 21.288 4.96894 21.6003 3.99993C20.7803 4.48793 19.8813 4.82993 18.9443 5.01493C18.3149 4.34151 17.4807 3.89489 16.5713 3.74451C15.6618 3.59413 14.7282 3.74842 13.9156 4.18338C13.1029 4.61834 12.4567 5.30961 12.0774 6.14972C11.6981 6.98983 11.607 7.93171 11.8183 8.82893C10.1554 8.74558 8.52863 8.31345 7.04358 7.56059C5.55854 6.80773 4.24842 5.75097 3.1983 4.45893C2.82659 5.09738 2.63125 5.82315 2.6323 6.56193C2.6323 8.01193 3.3703 9.29293 4.4923 10.0429C3.82831 10.022 3.17893 9.84271 2.5983 9.51993V9.57193C2.5985 10.5376 2.93267 11.4735 3.54414 12.221C4.15562 12.9684 5.00678 13.4814 5.9533 13.6729C5.33691 13.84 4.6906 13.8646 4.0633 13.7449C4.33016 14.5762 4.8503 15.3031 5.55089 15.824C6.25147 16.3449 7.09742 16.6337 7.9703 16.6499C7.10278 17.3313 6.10947 17.8349 5.04718 18.1321C3.98488 18.4293 2.87442 18.5142 1.7793 18.3819C3.69099 19.6114 5.91639 20.264 8.1893 20.2619C15.8823 20.2619 20.0893 13.8889 20.0893 8.36193C20.0893 8.18193 20.0843 7.99993 20.0763 7.82193C20.8952 7.23009 21.6019 6.49695 22.1633 5.65693L22.1623 5.65593Z"
            fill="#5E718D"
          />
        </g>
        <defs>
          <clipPath id="clip0_2398_29790">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <g clip-path="url(#clip0_2398_29746)">
          <path
            d="M15.402 21V14.034H17.735L18.084 11.326H15.402V9.598C15.402 8.814 15.62 8.279 16.744 8.279H18.178V5.857C17.4838 5.78334 16.7861 5.74762 16.088 5.75C14.021 5.75 12.606 7.012 12.606 9.33V11.326H10.268V14.034H12.606V21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H15.402Z"
            fill="#5E718D"
          />
        </g>
        <defs>
          <clipPath id="clip0_2398_29746">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <g clip-path="url(#clip0_2398_29749)">
          <path
            d="M18.335 18.339H15.67V14.162C15.67 13.166 15.65 11.884 14.28 11.884C12.891 11.884 12.679 12.968 12.679 14.089V18.339H10.013V9.75H12.573V10.92H12.608C12.966 10.246 13.836 9.533 15.136 9.533C17.836 9.533 18.336 11.311 18.336 13.624V18.339H18.335ZM7.003 8.575C6.79956 8.57526 6.59806 8.53537 6.41006 8.45761C6.22207 8.37984 6.05127 8.26574 5.90746 8.12184C5.76365 7.97793 5.64965 7.80706 5.57201 7.61901C5.49437 7.43097 5.4546 7.22944 5.455 7.026C5.4552 6.71983 5.54618 6.4206 5.71644 6.16615C5.8867 5.91169 6.12859 5.71343 6.41153 5.59645C6.69447 5.47947 7.00574 5.44902 7.30598 5.50894C7.60622 5.56886 7.88196 5.71648 8.09831 5.93311C8.31466 6.14974 8.46191 6.42566 8.52145 6.72598C8.58099 7.0263 8.55013 7.33753 8.43278 7.62032C8.31543 7.9031 8.11687 8.14474 7.86219 8.31467C7.60751 8.4846 7.30817 8.5752 7.002 8.575H7.003ZM8.339 18.339H5.666V9.75H8.34V18.339H8.339ZM19.67 3H4.329C3.593 3 3 3.58 3 4.297V19.703C3 20.42 3.594 21 4.328 21H19.666C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3H19.669H19.67Z"
            fill="#5E718D"
          />
        </g>
        <defs>
          <clipPath id="clip0_2398_29749">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
<div
      class="footer"
      style="
        margin-top: 1rem;
        align-self: stretch;
        color: var(--colors-primary-slate-500, #5e718d);
        text-align: center;
        font-family: Inter;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.25rem;
        letter-spacing: -0.0125rem;
      "
    >
      Copyright © 2023
      <br />
      Storefront Rewards & Recognition.
      <br />
      A better company begins with a personalized employee experience.
    </div>
  </body>
</html> 
      `;
};

export interface PaymentInfo {
	email: string;
	givenName: string;
	surname: string;
}

export interface OrderDetails {
	customerName: string;
	customerEmail: string | undefined;
	items?: ORDER_ITEM[];
	total: number | string;
	status: string;
	shipping?: SHIPPING;
	paid: boolean;
	currency: string;
	orderID: string;
	payer: PaymentInfo | null;
}

export const emailInvoices = (options: OrderDetails) => {
	let items = '';

	if (options.items && options.items.length > 0) {
		options.items.forEach((item) => {
			items =
				items +
				`
           <div>
        <tr>
          <td
            style="
              color: #455468;
              font-size: 14px;
              font-family: Inter;
              font-weight: 500;
              line-height: 24px;
              display: flex;
              margin-top: 10px;
            "
          >
            <div style="width: 150px">
              <img
                style="border-radius: 4px; width: 56px;
  height: 56px;"
                src=${item.image}
                alt=""
              />
            </div>
            <span
              style="padding-left: 10px; display: flex; flex-direction: column"
              ><p style="font-weight: 600; font-size: 12px">${item.name}</p><b/>
              <p style="margin-top: -15px; font-size: 10px">Quantity: ${item.quantity}</p></span
            >
          </td>
          <td style="height: 50px">
            <span style="font-family: inter; font-size: 12px; font-weight: 500"
              >${options.currency} ${item.total}</span
            >
          </td>
        </tr>
      </div>
        `;
		});
	}

	let payer = '';

	if (options.payer) {
		payer = ` <div class="content3">
                <div class="payment-method-icon">
                 <svg  class='mastercard' width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="PayPal">
<path id="Fill 7" fill-rule="evenodd" clip-rule="evenodd" d="M4.48504 17.5979L4.77934 15.6657L4.12374 15.6499H0.993164L3.16881 1.39176C3.17559 1.34858 3.1975 1.3085 3.2295 1.27999C3.26165 1.25148 3.30264 1.23584 3.34551 1.23584H8.62415C10.3767 1.23584 11.5861 1.61269 12.2174 2.35661C12.5134 2.7056 12.7019 3.07039 12.7932 3.47168C12.8889 3.89284 12.8905 4.39596 12.7972 5.0097L12.7904 5.05434V5.44765L13.0864 5.621C13.3356 5.7577 13.5338 5.9141 13.6857 6.09316C13.9389 6.39164 14.1027 6.77093 14.1719 7.22045C14.2434 7.68283 14.2198 8.2332 14.1027 8.85623C13.9676 9.57278 13.7493 10.1969 13.4543 10.7076C13.1832 11.1781 12.8377 11.5685 12.4274 11.8709C12.0356 12.1583 11.5703 12.3764 11.0441 12.516C10.5342 12.6532 9.95284 12.7225 9.31521 12.7225H8.90442C8.61075 12.7225 8.32544 12.8318 8.10144 13.0278C7.87682 13.2279 7.72833 13.5013 7.68277 13.8002L7.65172 13.9742L7.13169 17.3799L7.1082 17.5048C7.10189 17.5444 7.09118 17.5641 7.07541 17.5775C7.06138 17.5897 7.04121 17.5979 7.0215 17.5979H4.48504Z" fill="#28356A"/>
<path id="Fill 8" fill-rule="evenodd" clip-rule="evenodd" d="M13.3668 5.09961C13.3512 5.20372 13.3331 5.31011 13.3129 5.41943C12.6168 9.11362 10.2351 10.3898 7.19343 10.3898H5.64469C5.27268 10.3898 4.95915 10.6689 4.90129 11.0482L3.88378 17.7192C3.8461 17.9683 4.03179 18.1927 4.27486 18.1927H7.02177C7.34696 18.1927 7.62329 17.9485 7.67452 17.6169L7.70148 17.4727L8.21867 14.0804L8.25193 13.8944C8.30253 13.5617 8.57949 13.3173 8.90469 13.3173H9.31548C11.9768 13.3173 14.0602 12.2006 14.6692 8.96878C14.9234 7.61877 14.7918 6.49149 14.1187 5.69869C13.915 5.45968 13.6624 5.26123 13.3668 5.09961Z" fill="#298FC2"/>
<path id="Fill 9" fill-rule="evenodd" clip-rule="evenodd" d="M12.6388 4.79974C12.5324 4.76765 12.4226 4.73864 12.3101 4.71241C12.1969 4.68683 12.0811 4.66419 11.9617 4.64431C11.5442 4.57458 11.0866 4.5415 10.5965 4.5415H6.45909C6.3571 4.5415 6.26032 4.56529 6.17378 4.6083C5.98288 4.70313 5.84117 4.88984 5.80681 5.11843L4.92659 10.8805L4.90137 11.0484C4.95922 10.6692 5.27275 10.3901 5.64476 10.3901H7.1935C10.2352 10.3901 12.6168 9.11321 13.313 5.41968C13.3338 5.31035 13.3513 5.20396 13.3669 5.09985C13.1908 5.00324 13.0001 4.92063 12.7947 4.85025C12.7439 4.83282 12.6916 4.81603 12.6388 4.79974Z" fill="#22284F"/>
<path id="Fill 11" fill-rule="evenodd" clip-rule="evenodd" d="M5.80686 5.11833C5.84122 4.88974 5.98293 4.70303 6.17383 4.60886C6.261 4.56568 6.35715 4.54189 6.45914 4.54189H10.5965C11.0866 4.54189 11.5442 4.57513 11.9618 4.64486C12.0811 4.66458 12.197 4.68739 12.3101 4.71297C12.4227 4.73903 12.5324 4.7682 12.6388 4.80013C12.6916 4.81642 12.7439 4.83337 12.7952 4.85015C13.0006 4.92053 13.1915 5.00379 13.3675 5.09975C13.5747 3.73459 13.3658 2.8051 12.6517 1.96342C11.8644 1.0367 10.4435 0.640137 8.62517 0.640137H3.34637C2.97499 0.640137 2.65815 0.919229 2.60077 1.29917L0.402111 15.704C0.358762 15.9889 0.571409 16.246 0.849472 16.246H4.10837L5.80686 5.11833Z" fill="#28356A"/>
</g>
</svg>

                </div>
                <div class="content4">
                  <div class="text-and-supporting-text">
                    <div class="text7">${options.payer.givenName} ${options.payer.surname}
                    <div class="text8">${options.payer.email}</div>
                  </div>
                </div>
              </div>`;
	}

	let shipping = ` <div class="channel-hat">Missing Shipping Info</div>`;

	if (options.shipping) {
		shipping = `
    
      <td
          style="
            height: 5px;
            color: #455468;
            font-size: 14px;
            font-family: Inter;
            font-weight: 500;
            word-wrap: break-word;
            padding-left: 15px;
          "
        >
          <span
            style="
              width: 100%;
              color: #455468;
              font-size: 14px;
              font-family: Inter;
              font-weight: 700;
              word-wrap: break-word;
            "
          >
           ${options.shipping.streetAddress}
            <br />
           ${options.shipping.city}, ${options.shipping.countryCode}<br />
           ${options.shipping.name}<br />
          </span>
          <p style="margin-top: -2px">${options.shipping.phone}</p>
        </td>

    `;
	}

	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;700&family=Poppins:wght@700&family=Roboto:wght@300&display=swap"
      rel="stylesheet"
    />
    <title>Shipping</title>
  </head>

  <body style="width: 100%; height: full; margin: auto">
    <table
      style="
        /* min-height: 100vh; */
        width: 100%;
        border-collapse: collapse;
        padding: 24px;
        background: white;
        box-shadow: 0px 8px 8px -4px rgba(16, 24, 40, 0.03);
        border-radius: 12px;
        overflow: hidden;
      "
    >
      <tr>
        <td
          style="
            width: 100%;
            height: 20px;
            color: #101828;
            font-size: 18px;
            font-family: Inter;
            font-weight: 500;
            line-height: 30px;
            word-wrap: break-word;
          "
        >
          <span
            style="
              font-size: 24px;
              margin-bottom: 10px;
              font-family: poppins;
              color: #0085ff;
            "
            >StoreFront</span
          >
          <br />
          <span>Order Details</span>
        </td>
      </tr>
      <tr>
        <td
          style="
            color: #5e718d;
            height: 20px;
            font-size: 16px;
            font-weight: bolder;
            font-family: Inter;
            font-weight: 700;
            line-height: 28px;
            word-wrap: break-word;
          "
        >
         ${options.customerName}
        </td>
      </tr>
      <tr>
        <td
          style="
            width: 100%;
            height: 20px;
            color: #5e718d;
            height: 50px;
            font-size: 16px;
            font-family: Inter;
            font-weight: 700;
            line-height: 28px;
            padding-left: 15px;
            word-wrap: break-word;
          "
        >
          Shipping Address
        </td>
      </tr>
      <tr>
      ${shipping}
      </tr>
      <tr>
        <td style="height: 50px">
          <span
            style="
              color: #5e718d;
              font-size: 16px;
              font-family: Inter;
              font-weight: 700;
              line-height: 28px;
              word-wrap: break-word;
            "
            >Purchased Items <br
          /></span>
          <span
            style="
              width: 100%;
              height: 100%;
              color: #5e718d;
              font-size: 12px;
              font-family: Inter;
              font-weight: 400;

              word-wrap: break-word;
            "
            >Order ID : # ${options.orderID}</span
          >
        </td>
        <td
          style="
            background: rgba(29, 180, 105, 0.12);
            border-radius: 6px;
            justify-content: center;
            align-items: center;
            display: inline-flex;
            margin-top: 30px;
            color: #11a75c;
            font-size: 12px;
            font-family: Inter;
            font-weight: 700;
          "
        >
         ${options.status}
        </td>
      </tr>

   ${items}

      <tr>
        <td
          style="
            color: #5e718d;
            font-size: 14px;
            font-family: Inter;
            font-weight: 600;
            word-wrap: break-word;
          "
        >
          Total Price
        </td>
        <td
          style="
            color: #455468;
            height: 20px;
            font-size: 14px;
            font-family: Inter;
            font-weight: 600;
            line-height: 28px;
            word-wrap: break-word;
          "
        >
         ${options.currency} ${options.total}
        </td>
      </tr>
      <tr>
        <td
          style="
            color: #5e718d;
            height: 20px;
            font-size: 16px;
            font-family: Inter;
            font-weight: 700;
            word-wrap: break-word;
          "
        >
          Payment Method
        </td>
      </tr>
      <tr>
        <td
          style="
            color: #455468;
            height: 20px;
            font-size: 14px;
            font-family: Inter;
            font-weight: 500;
          "
        >
          ${payer}
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};
