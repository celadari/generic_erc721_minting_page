# generic_erc721_minting_page
Minting page for a generic Non Fungible Tokens project

# I) Development mode

## 1) Install ansible

**Ansible version requirement: >2.0.0 & <2.10.7**

### a) recommended way: with virtualenv
- Install [pyenv](https://github.com/pyenv/pyenv)
along with [pyenv-virtualenv](https://github.com/pyenv/pyenv-virtualenv)
- Using 3.10.6 for python version is highly recommended
```shell
pyenv gloval 3.10.6
```
- Create a virtual env
```shell
pyenv virtualenv ansible
```
- Activate the just created virtual env
```shell
pyenv activate ansible
```
- Install ansible
```shell
pip install ansible==2.10.7
```

### b) non recommended way: installing globally
```shell
sudo pip install ansible==2.10.7
```

## 2) Install `pg_dump`
```shell
sudo apt-get install postgresql-client
```

## 3) Create a vault file
Ansible needs to access some sensitive variables, these are defined
in a vault file.

- Create a vault file on directory `ansible/vars/dev/`:
```shell
touch <PATH_TO_REPOSITORY>/ansible/vars/dev/vault
```

- Edit `vault` file with the following parameters (you need to
provide your own values):
```
---
# database minting page
vault_db_user: "..."
vault_db_database: "..."
vault_db_port: 5434
vault_db_port_inside_container: 5432
vault_db_password: "..."
vault_db_host: "localhost"

# database smart contract project
vault_db_smart_contract_user: "..."
vault_db_smart_contract_database: "..."
vault_db_smart_contract_port: 5433
vault_db_smart_contract_port_inside_container: 5432
vault_db_smart_contract_password: "...."
vault_db_smart_contract_host: "..."

# server
vault_server_authentication_auth_secret: "<RANDOM_VALUE>"

# smart contract
vault_remote_path_json_abi_file: "<PATH_TO_GENERIC_ERC721_SMART_CONTRACT_REPO>/build/contracts/SmartContract.json"
```


## 5) Generate .env file and fetch smart contract abi
To interact with the NFT smart contract you need to fetch some
information such as: its address, signatures, ...
If all variables are provided in the `vault` file, a simple ansible
command takes charge of:
- fetching smart contract attributes
- fetching smart contract abi .json file
- generate .env file to launch docker-compose

```shell
ansible-playbook ansible/dev_generate_env_file.yml --ask-vault-pass
```

## 6) Run app
```shell
docker-compose up --build
```

**Remark**: (optional) before running the docker-compose you can edit the `ansible/vars/dev/vars.yml`
file if you wish to
```yaml
# smart contract
nb_tokens: 9336
smart_contract_is_revealed: false
smart_contract_token_price_in_eth: 1.5

# ipfs gateway
ipfs_gateway_url: "https://cloudflare-ipfs.com/ipfs"
```

## 7) Fetch data from database of `generic_erc721_smart_contract`

**Remark**: This part requires you to have `pg_dump` installed.

```shell
ansible-playbook ansible/fetch_and_load_merkle_proofs_and_vouchers.yml --ask-vault-pass
```
