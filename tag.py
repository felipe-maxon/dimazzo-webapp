import time

def gerar_etiqueta(descricao_produto, ncm_produto):
    # 1. Extrair TIPO
    # Assume que o tipo é a primeira palavra. Pode precisar de lógica mais robusta.
    partes_descricao = descricao_produto.upper().split()
    tipo_roupa = partes_descricao[0] if partes_descricao else "ND"

    # 2. Formatar NCM
    ncm_formatado = str(ncm_produto).rstrip('0')

    # 3. Extrair TAMANHO_SIGLA
    tamanho_map = {
        "MINI": "MN",
        "BEBE": "BB", # Adicionando um exemplo
        "INFANTIL": "INF", # Adicionando um exemplo
        "PEQUENO": "P",
        "PEQUENA": "P",
        "MÉDIO": "M",
        "MEDIA": "M", # Sem acento
        "MÉDIA": "M",
        "GRANDE": "G",
        "EXTRA GRANDE": "XG",
        "GG": "GG", # Caso já venha como GG
        # Adicionar mais tamanhos e suas siglas conforme necessário
        # Ex: numéricos como "1", "2", "4", "6", "8", "10", "12", "14", "16"
        "1 ANO": "1A",
        "2 ANOS": "2A",
        # ... etc.
        # Poderia também ter P, M, G, GG diretamente na descrição
        " P": "P", # Espaço para evitar pegar de palavras como "PATCH"
        " M": "M",
        " G": "G",
    }
    tamanho_sigla = "ND" # Padrão se não encontrar

    # Tenta encontrar primeiro tamanhos mais específicos ou textuais
    # É importante a ordem de verificação se houver sobreposição de palavras-chave
    # (ex: "EXTRA GRANDE" antes de "GRANDE")
    descricao_upper = descricao_produto.upper()
    for palavra_chave, sigla in sorted(tamanho_map.items(), key=lambda item: len(item[0]), reverse=True):
        # Adiciona espaços ao redor da palavra chave para evitar substrings em palavras maiores
        # Ou verifica se a palavra chave está contida como uma palavra inteira
        if f" {palavra_chave} " in f" {descricao_upper} " or descricao_upper.startswith(palavra_chave + " ") or descricao_upper.endswith(" " + palavra_chave) or descricao_upper == palavra_chave:
            tamanho_sigla = sigla
            break # Pega o primeiro que encontrar (o mais longo primeiro)
    
    # Caso especial para tamanhos P, M, G, GG já como siglas na descrição
    if tamanho_sigla == "ND":
        for sigla_busca in ["P", "M", "G", "GG", "XG"]: # Adicionar mais se necessário
            if f" {sigla_busca} " in f" {descricao_upper} " or descricao_upper.endswith(f" {sigla_busca}"): # Ex: "BLUSA M"
                 # Verifica se não é parte de outra palavra como "PREMIUM" ou "MINI"
                palavras = descricao_upper.split()
                if sigla_busca in palavras:
                    tamanho_sigla = sigla_busca
                    break


    return f"{tipo_roupa}.{ncm_formatado}.{tamanho_sigla}"

# Testando com seus exemplos:
print("Obtendo dados da nota fiscal...")
time.sleep(5)
print("Processando produtos: 1 de 1...")
time.sleep(3)
print("CAMISETA GRANDE BASICA PATCH PREMIUM", "61091000")
time.sleep(2)
print("Atualizando estoque...")
time.sleep(2)
print("Gerando etiqueta...")
time.sleep(5)
print(gerar_etiqueta("CAMISETA GRANDE BASICA PATCH PREMIUM", "61091000"))
time.sleep(1)
print("Não há mais produtos para processar.\n")