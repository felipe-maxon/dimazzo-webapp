import json
import os
import time
from datetime import datetime

def estacao_do_ano(mes):
    if mes in [12, 1, 2]:
        return "VERÃO"
    elif mes in [3, 4, 5]:
        return "OUTONO"
    elif mes in [6, 7, 8]:
        return "INVERNO"
    elif mes in [9, 10, 11]:
        return "PRIMAVERA"
    return "ND"

def gerar_etiqueta(descricao_produto, ncm_produto, tamanho_real, cor, codigo_barras, valor_unitario):
    partes_descricao = descricao_produto.upper().split()
    tipo_roupa = partes_descricao[0] if partes_descricao else "ND"
    ncm_formatado = str(ncm_produto).rstrip('0')

    tamanho_map = {
        "EXTRA GRANDE": "XG", "GRANDE": "G",
        "MÉDIO": "M", "MEDIA": "M", "MÉDIA": "M",
        "PEQUENO": "P", "PEQUENA": "P",
        "MINI": "MN", "BEBE": "BB", "INFANTIL": "INF",
        "GG": "GG", "1 ANO": "1A", "2 ANOS": "2A",
        " P": "P", " M": "M", " G": "G"
    }

    tamanho_sigla = "ND"
    descricao_upper = descricao_produto.upper()

    for palavra_chave, sigla in sorted(tamanho_map.items(), key=lambda item: len(item[0]), reverse=True):
        if f" {palavra_chave} " in f" {descricao_upper} " or descricao_upper.startswith(palavra_chave + " ") or descricao_upper.endswith(" " + palavra_chave) or descricao_upper == palavra_chave:
            tamanho_sigla = sigla
            break

    if tamanho_sigla == "ND":
        for sigla_busca in ["P", "M", "G", "GG", "XG"]:
            if f" {sigla_busca} " in f" {descricao_upper} " or descricao_upper.endswith(f" {sigla_busca}"):
                palavras = descricao_upper.split()
                if sigla_busca in palavras:
                    tamanho_sigla = sigla_busca
                    break

    agora = datetime.now()
    data_str = agora.strftime('%Y%m%d%H%M%S')
    estacao = estacao_do_ano(agora.month)

    preco_venda = round(valor_unitario * 2.4, 2)

    etiqueta = (
        "*----------------------*\n"
        f"{tipo_roupa}.{ncm_formatado}.{tamanho_sigla}\n"
        f"Tam: {tamanho_real}\n"
        f"Cor: {cor}\n"
        f"{codigo_barras}\n"
        f"{data_str}\n"
        f"{estacao}\n"
        "\n"
        f"{tipo_roupa}.{ncm_formatado}.{tamanho_sigla}\n"
        f"Tam: {tamanho_real}\n"
        f"Cor: {cor}\n"
        f"{codigo_barras}\n"
        f"{data_str}\n"
        f"{estacao}\n"
        f"R$ {preco_venda:.2f}\n"
        "*----------------------*"
    )

    return etiqueta

folder = "C:/Users/felip/Desktop/GITHUB_MAXON/dimazzo-webapp/shared/LOTES_NF"

if os.path.exists(folder):
    files = sorted([f for f in os.listdir(folder) if f.endswith(".json")], reverse=True)
    latest_file = os.path.join(folder, files[0]) if files else None

    if latest_file:
        print("Obtendo dados da nota fiscal...")
        time.sleep(2)

        with open(latest_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        produtos = data.get("produtos", [])
        for i, produto in enumerate(produtos):
            print(f"Processando produtos: {i+1} de {len(produtos)}...")
            time.sleep(1)
            descricao = produto.get("descricao", "DESCONHECIDO")
            ncm = produto.get("ncm", "00000000")
            tamanho_real = produto.get("tamanho", "ND")
            cor = produto.get("cor", "ND")
            codigo = produto.get("codigo", "000000000000")
            valor_unitario = produto.get("valor_unitario", 0.0)

            print(descricao)
            time.sleep(1)
            print("Atualizando estoque...")
            time.sleep(1)
            print("Gerando etiqueta...")
            time.sleep(2)

            etiqueta = gerar_etiqueta(descricao, ncm, tamanho_real, cor, codigo, valor_unitario)
            print(etiqueta)
            print()

        print("Não há mais produtos para processar.\n")
    else:
        print("Nenhum arquivo de lote .json encontrado na pasta.")
else:
    print(f"A pasta de lotes não existe:\n{folder}")
