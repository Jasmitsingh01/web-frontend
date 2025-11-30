const GRAPHQL_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/graphql';

// Helper function to make GraphQL requests
async function graphqlRequest(query: string, variables?: any, token?: string) {
    const headers: any = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const result = await response.json();

    if (result.errors) {
        throw new Error(result.errors[0].message);
    }

    return result.data;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Helper function to make REST requests
async function restRequest(endpoint: string, method: string, body?: any, token?: string, isFormData: boolean = false) {
    const headers: any = {};

    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config: any = {
        method,
        headers,
    };

    if (body) {
        config.body = isFormData ? body : JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, config);
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Request failed');
    }

    return result;
}

export const graphqlApi = {
    auth: {
        register: async (formData: FormData) => {
            return restRequest('/auth/register', 'POST', formData, undefined, true);
        },

        login: async (input: { email: string; password: string }) => {
            return restRequest('/auth/login', 'POST', input);
        },

        sendOTP: async (identifier: string) => {
            // Determine if email or phone
            const isEmail = identifier.includes('@');
            const payload = isEmail ? { email: identifier } : { phone: identifier };
            return restRequest('/auth/send-otp', 'POST', payload);
        },

        verifyOTP: async (identifier: string, code: string) => {
            const isEmail = identifier.includes('@');
            const payload = isEmail
                ? { email: identifier, emailOtp: code }
                : { phone: identifier, phoneOtp: code };
            return restRequest('/auth/verify-otp', 'POST', payload);
        },

        me: async (token: string) => {
            const query = `
        query Me {
          me {
            id
            fullname
            email
            phone
            role
            accountStatus
            mobileNumber
            isVerified
            isKYCCompleted
            kycStatus
          }
        }
      `;
            return graphqlRequest(query, {}, token);
        },

        logout: async (token: string) => {
            const query = `
        mutation Logout {
          logout {
            success
            message
          }
        }
      `;
            return graphqlRequest(query, {}, token);
        },
    },

    dashboard: {
        getData: async (token: string) => {
            const query = `
        query Dashboard {
          dashboard {
            balance {
              total
              change
              recentDeposits
            }
            activities {
              id
              type
              amount
              currency
              status
              createdAt
            }
            notifications {
              id
              title
              message
              isRead
              isDone
              priority
              createdAt
            }
            watchlist {
              symbol
              assetType
              alertPrice
              notes
              addedAt
            }
            pendingActions
            charts {
              portfolioPerformance
              depositActivity
            }
          }
        }
      `;
            return graphqlRequest(query, {}, token);
        },
    },

    user: {
        getProfile: async (token: string) => {
            const query = `
        query UserProfile {
          userProfile {
            id
            fullname
            email
            phone
            role
            accountStatus
            mobileNumber
            Address
            Address1
            city
            state
            country
            pincode
            dateOfBirth
            nationality
            avatar
            isVerified
            isKYCCompleted
            kycStatus
          }
        }
      `;
            return graphqlRequest(query, {}, token);
        },

        updateProfile: async (token: string, input: any) => {
            const query = `
        mutation UpdateProfile($input: UpdateProfileInput!) {
          updateProfile(input: $input) {
            id
            fullname
            email
            phone
            Address
            city
            state
            country
            pincode
          }
        }
      `;
            return graphqlRequest(query, { input }, token);
        },

        getBalance: async (token: string) => {
            const query = `
        query UserBalance {
          userBalance {
            id
            availableBalance
            totalBalance
            lockedBalance
            totalDeposited
            totalWithdrawn
            totalProfit
            totalLoss
            currency
            totalInvested
            unrealizedPnL
            realizedPnL
            bonusBalance
            referralEarnings
          }
        }
      `;
            return graphqlRequest(query, {}, token);
        },

        getPortfolio: async (token: string) => {
            const query = `
        query UserPortfolio {
          userPortfolio {
            id
            totalValue
            totalInvested
            totalProfitLoss
            profitLossPercentage
            activePositions
            closedPositions
          }
        }
      `;
            return graphqlRequest(query, {}, token);
        },
    },

    transactions: {
        getAll: async (
            token: string,
            params?: { page?: number; limit?: number; type?: string; status?: string }
        ) => {
            const query = `
        query Transactions($page: Int, $limit: Int, $type: TransactionType, $status: TransactionStatus) {
          transactions(page: $page, limit: $limit, type: $type, status: $status) {
            transactions {
              id
              type
              amount
              currency
              status
              paymentMethod
              description
              balanceBefore
              balanceAfter
              createdAt
              updatedAt
            }
            pagination {
              page
              limit
              totalPages
              totalItems
              hasNext
              hasPrevious
            }
          }
        }
      `;
            return graphqlRequest(query, params, token);
        },

        getById: async (token: string, id: string) => {
            const query = `
        query Transaction($id: ID!) {
          transaction(id: $id) {
            id
            type
            amount
            currency
            status
            paymentMethod
            description
            notes
            balanceBefore
            balanceAfter
            createdAt
            updatedAt
          }
        }
      `;
            return graphqlRequest(query, { id }, token);
        },

        createDeposit: async (token: string, input: any) => {
            const query = `
        mutation CreateDeposit($input: CreateDepositInput!) {
          createDeposit(input: $input) {
            id
            type
            amount
            currency
            status
            createdAt
          }
        }
      `;
            return graphqlRequest(query, { input }, token);
        },

        createWithdrawal: async (token: string, input: any) => {
            const query = `
        mutation CreateWithdrawal($input: CreateWithdrawalInput!) {
          createWithdrawal(input: $input) {
            id
            type
            amount
            currency
            status
            createdAt
          }
        }
      `;
            return graphqlRequest(query, { input }, token);
        },
    },

    notifications: {
        getAll: async (token: string, params?: { page?: number; limit?: number; isRead?: boolean }) => {
            const query = `
        query Notifications($page: Int, $limit: Int, $isRead: Boolean) {
          notifications(page: $page, limit: $limit, isRead: $isRead) {
            notifications {
              id
              type
              title
              message
              isRead
              isDone
              priority
              actionRequired
              actionUrl
              actionLabel
              createdAt
            }
            pagination {
              page
              limit
              totalPages
              totalItems
              hasNext
              hasPrevious
            }
          }
        }
      `;
            return graphqlRequest(query, params, token);
        },

        markAsRead: async (token: string, id: string) => {
            const query = `
        mutation MarkNotificationAsRead($id: ID!) {
          markNotificationAsRead(id: $id) {
            id
            isRead
          }
        }
      `;
            return graphqlRequest(query, { id }, token);
        },

        markAllAsRead: async (token: string) => {
            const query = `
        mutation MarkAllNotificationsAsRead {
          markAllNotificationsAsRead {
            success
            message
          }
        }
      `;
            return graphqlRequest(query, {}, token);
        },

        delete: async (token: string, id: string) => {
            const query = `
        mutation DeleteNotification($id: ID!) {
          deleteNotification(id: $id) {
            success
            message
          }
        }
      `;
            return graphqlRequest(query, { id }, token);
        },
    },

    watchlist: {
        get: async (token: string) => {
            const query = `
        query Watchlist {
          watchlist {
            id
            assets {
              symbol
              assetType
              addedAt
              alertPrice
              notes
            }
          }
        }
      `;
            return graphqlRequest(query, {}, token);
        },

        add: async (
            token: string,
            input: { symbol: string; assetType: string; alertPrice?: number; notes?: string }
        ) => {
            const query = `
        mutation AddToWatchlist($input: AddToWatchlistInput!) {
          addToWatchlist(input: $input) {
            id
            assets {
              symbol
              assetType
              alertPrice
              notes
            }
          }
        }
      `;
            return graphqlRequest(query, { input }, token);
        },

        remove: async (token: string, symbol: string) => {
            const query = `
        mutation RemoveFromWatchlist($symbol: String!) {
          removeFromWatchlist(symbol: $symbol) {
            id
            assets {
              symbol
              assetType
            }
          }
        }
      `;
            return graphqlRequest(query, { symbol }, token);
        },

        update: async (token: string, symbol: string, input: { alertPrice?: number; notes?: string }) => {
            const query = `
        mutation UpdateWatchlistItem($symbol: String!, $input: UpdateWatchlistInput!) {
          updateWatchlistItem(symbol: $symbol, input: $input) {
            id
            assets {
              symbol
              alertPrice
              notes
            }
          }
        }
      `;
            return graphqlRequest(query, { symbol, input }, token);
        },
    },
};

// Export both the old REST API (for backward compatibility) and the new GraphQL API
export { graphqlApi as api };
