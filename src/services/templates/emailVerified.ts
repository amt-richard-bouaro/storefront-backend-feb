const emailVerified = (name: string) => {
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
        margin-top: 4.5rem;
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
        Hello ${name}, </br> Your account has been verified.
         
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
      Now you can login to activate your account
      <br />
      <br />
      Choose a strong and unique password for enhanced account security. If you
      have any questions or need assistance, contact our support team. We're
      here to help.
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
</html>`;
};

export default emailVerified;
